var speechRecognizer = {};

speechRecognizer.hypothesisCallback = function (hyp) {
    console.log("New Hypothesis: " + hyp);
};
speechRecognizer.finalHypothesisCallback = function (hyp) {
    console.log("Final Hypothesis: " + hyp);
};

if (typeof SpeechRecognition == "undefined" && typeof webkitSpeechRecognition == "undefined") {
    speechRecognizer.startRecognizing = function () {
        startRecording();
    };
    speechRecognizer.stopRecognizing = function () {
        stopRecording();
    };
} else {
    console.log("Using browser speech recognition API");
    var recognition = SpeechRecognition ? new SpeechRecognition() : new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() { }
    recognition.onresult = function(e) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (e.results[i].isFinal) {
                speechRecognizer.finalHypothesisCallback(e.results[i][0].transcript);
            } else {
                speechRecognizer.hypothesisCallback(e.results[i][0].transcript);
            }
        }
    };
    recognition.onerror = function(e) { }
    recognition.onend = function() { }    

    speechRecognizer.startRecognizing = function () {
        recognition.start();        
    };
    speechRecognizer.stopRecognizing = function () {
        recognition.stop();
    };
}
