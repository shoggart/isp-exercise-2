var mySound;
var playButton;
var pauseButton;
var stopButton;
var analyzer;
var rms_size;
var zcr_size;
var energy_size;
var perceptual_spread;
var spectral_centroid;
var perceptual_sharpness;
var spectral_kurtosis;

function preload() {
    soundFormats('wav', 'mp3');
    mySound = loadSound('/sounds/Kalte_Ohren_(_Remix_).mp3');
}

function setup() {
    createCanvas(800, 600);
    background(0, 191, 255);

    playButton = createButton('play');
    playButton.position(10, 10);
    playButton.mousePressed(play_Button);

    // pauseButton = createButton('pause');
    // pauseButton.position(60, 10);
    // pauseButton.mousePressed(pause_Button);

    stopButton = createButton('stop');
    stopButton.position(60, 10);
    stopButton.mousePressed(stop_Button);

    if (typeof Meyda === 'undefined') {
        console.log('Meyda not found');
    } else {
        // Meyda analyzer object
        analyzer = Meyda.createMeydaAnalyzer({
            "audioContext": getAudioContext(),
            "source": mySound,
            "bufferSize": 512,
            "featureExtractors": ["rms", 
                                  "zcr", 
                                  "energy", 
                                  "perceptualSpread", 
                                  "spectralCentroid", 
                                  "perceptualSharpness",
                                  "spectralKurtosis"],
            "callback": features => {
                // console.log(features);
                rms_size = features.rms;
                zcr_size = features.zcr;
                energy_size = features.energy;
                perceptual_spread = features.perceptualSpread;
                spectral_centroid = features.spectralCentroid;
                perceptual_sharpness = features.perceptualSharpness;
                spectral_kurtosis = features.spectralKurtosis;
            }
        });
    }
}

function draw() {
    background(0, 191, 255);
    strokeWeight(4);
    stroke(0, 0, 128, 200);
    fill(0, 255, 255, 200);
    rectMode(CENTER);
    rect(100, 300, 600 * rms_size, 300 * rms_size);
    stroke(255, 69, 0);
    strokeWeight(3);
    fill(139, 0, 0, 200);
    rect(200, 300, 2 * zcr_size, zcr_size);
    stroke(0, 255, 0);
    strokeWeight(2);
    fill(0, 150, 0, 200);
    rect(300, 300, map(energy_size, 0, 512, 100, 500), map(energy_size, 0, 512, 100, 500));
    stroke(0, 0, 0);
    strokeWeight(3);
    fill(139, 69, 19, 200);
    rect(400, 300, map(perceptual_spread, 0, 1, 0, 100), map(perceptual_spread, 0, 1, 0, 200));
    stroke(255, 255, 0);
    strokeWeight(2);
    fill(255, 165, 0, 220);
    rect(500, 300, map(spectral_centroid, 0, 256, 200, 400), map(spectral_centroid, 0, 256, 50, 100));
    stroke(75, 0, 130);
    strokeWeight(3);
    fill(138, 43, 226, 220);
    rect(600, 300, map(perceptual_sharpness, 0, 1, 0, 200), map(perceptual_sharpness, 0, 1, 0, 150));
    stroke(0, 0, 255);
    strokeWeight(3);
    fill(255, 255, 0);
    rect(700, 300, map(spectral_kurtosis, 0, 1, 0, 0.5), map(spectral_kurtosis, 0, 1, 0, 0.75));
}

// use play button if not already playing
function play_Button() {
    if (mySound.isPlaying()) {
    } else {
        mySound.play();
        analyzer.start();
    }
}

// function pause_Button() {
//     if (mySound.isPlaying()) {
//         mySound.pause();
//         analyzer.pause();
//     }
// }

// use stop button if not playing
function stop_Button() {
    if (mySound.isPlaying()) {
        mySound.stop();
        analyzer.stop();
    }
}