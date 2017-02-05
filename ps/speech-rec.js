var outputSampleRate = 16000; // For some reason this works better with 16kHz than it does with 8kHz, even on hub4 (8k)...
var acousticModel = "rm1_200";
    acousticModel = "hub4wsj_sc_8k";
var amFolder = "pocketsphinx.js-en_US-hub4wsj_sc_8k";
if (acousticModel == "rm1_200") {
    amFolder = "pocketsphinx.js-en_US-rm1_200";
}
var dictionary = "hub4.5000.dic"; // the dictionary name
var dictionaryFile = "en_US/" + dictionary + ".js";  // the dictionary JS file name, should start with "../"
var lms = [ "hub4.5000.DMP", "wsj0vp.5000.DMP", "en-phone.lm.DMP" ];
var languageModel = lms[1]; // the model name
var languageModelFile = "en_US/" + languageModel + ".js"; // the model JS file name, should start with "../"
var amFiles = ["feat.params.js", "mdef.js", "means.js", "noisedict.js", "sendump.js", "transition_matrices.js", "variances.js"];

// These will be initialized later
var recognizer, recorder, callbackManager, audioContext, outputContainer;
// Only when both recorder and recognizer are ready do we have a ready application
var recorderReady = recognizerReady = false;

// A convenience function to post a message to the recognizer and associate
// a callback to its response
function postRecognizerJob(message, callback) {
    var msg = message || {};
    if (callbackManager) msg.callbackId = callbackManager.add(callback);
    if (recognizer) recognizer.postMessage(msg);
};

function spawnWorker(workerURL, onReady) {
  recognizer = new Worker(workerURL);
  recognizer.onmessage = function(event) {
    onReady(recognizer);
  };
  recognizer.postMessage('');
};

// To display the hypothesis sent by the recognizer
function updateHyp(hyp) {
    if (outputContainer) outputContainer.innerHTML = hyp;
};

// This updates the UI when the app becomes ready
// Only when both recorder and recognizer are ready do we enable the buttons
function updateUI() {
    console.log("Ready!");
};

// Callback function once the user authorises access to the microphone
// in it, we instanciate the recorder
function startUserMedia(stream) {
    // This is where magic happens, we can now get the audio samples
    // from getUserMedia
    var input = audioContext.createMediaStreamSource(stream);
    // Firefox hack https://support.mozilla.org/en-US/questions/984179
    window.firefox_audio_hack = input; 
    var audioRecorderConfig = {
        outputSampleRate: outputSampleRate,
        errorCallback: function(x) { console.log("Error from recorder: " + x);}};
    recorder = new AudioRecorder(input, audioRecorderConfig);
    // If a recognizer is ready, we pass it to the recorder
    if (recognizer) recorder.consumers = [recognizer];
    recorderReady = true;
    updateUI();
    console.log("Audio recorder ready");
};

// This starts recording. We first need to get the id of the grammar to use
var startRecording = function() {
    if (recorder && recorder.start(undefined)) {
        //we're recording
    }
};

// Stops recording
var stopRecording = function() {
    recorder && recorder.stop();
};

// Called once the recognizer is ready
// We then add the grammars to the input select tag and update the UI
var recognizerReady = function() {
   recognizerReady = true;
   updateUI();
    console.log("Recognizer ready");
};

/*var feedGrammar = function(g, index, id) {
    recognizerReady();
};
var feedWords = function(words) {
};*/

// This initializes the recognizer. When it calls back, we add words
var initRecognizer = function() {
  // You can pass parameters to the recognizer, such as : {command: 'initialize', data: [["-hmm", "my_model"], ["-fwdflat", "no"]]}
  var data = [["-hmm", acousticModel]];
  if (dictionary) data.push(["-dict", dictionary]);
  if (languageModel) data.push(["-lm", languageModel]);
  postRecognizerJob({command: 'initialize', data: data},
                    function() {
                                if (recorder) recorder.consumers = [recognizer];
                                else recognizerReady();
                                });
};

var loadModels = function() {
  var data = amFiles.map(function(x) {return "../" + amFolder + "/" + x;});
  if (dictionary) data.push(dictionaryFile);
  if (languageModel) data.push(languageModelFile);
  postRecognizerJob({command: 'load', data: data}, initRecognizer);
};

// When the page is loaded, we spawn a new recognizer worker and call getUserMedia to
// request access to the microphone
window.onload = function() {
    console.log("Initializing web audio and speech recognizer, waiting for approval to access the microphone");
    callbackManager = new CallbackManager();
    spawnWorker("ps/pocketsphinx/recognizer.js", function(worker) {
        // This is the onmessage function, once the worker is fully loaded
        worker.onmessage = function(e) {
            // This is the case when we have a callback id to be called
            if (e.data.hasOwnProperty('id')) {
              var clb = callbackManager.get(e.data['id']);
              var data = {};
              if (e.data.hasOwnProperty('data')) data = e.data.data;
              if (clb) clb(data);
            }
            // This is a case when the recognizer has a new hypothesis
            if (e.data.hasOwnProperty('hyp')) {
              var newHyp = e.data.hyp;
              if (e.data.hasOwnProperty('final') && e.data.final) {
                  speechRecognizer.finalHypothesisCallback(newHyp);
                  newHyp = "Final: " + newHyp;
              } else {
                  speechRecognizer.hypothesisCallback(newHyp);
              }
            }
            // This is the case when we have an error
            if (e.data.hasOwnProperty('status') && (e.data.status == "error")) {
              console.log("Error in " + e.data.command + " with code " + e.data.code);
            }
        };
        // Once the worker is fully loaded, we can call the initialize function
        loadModels();
    });

    // The following is to initialize Web Audio
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      audioContext = new AudioContext();
    } catch (e) {
      console.log("Error initializing Web Audio browser");
    }
    if (navigator.getUserMedia) navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
                                    console.log("No live audio input in this browser");
                                });
    else console.log("No web audio support in this browser");
};

