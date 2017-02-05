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
    speechRecgonizer.recognition = null;
    if (webkitSpeechRecognition) {
        speechRecognizer.recognition = new webkitSpeechRecognition();
    } else {
        speechRecognizer.recognition = new SpeechRecognition;
    }

    speechRecognizer.recognition.continuous = true;
    speechRecognizer.recognition.interimResults = true;

    speechRecognizer.recognition.onstart = function() { }
    speechRecognizer.recognition.onresult = function(e) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (e.results[i].isFinal) {
                speechRecognizer.finalHypothesisCallback(e.results[i][0].transcript);
            } else {
                speechRecognizer.hypothesisCallback(e.results[i][0].transcript);
            }
        }
    };
    speechRecognizer.recognition.onerror = function(e) { }
    speechRecognizer.recognition.onend = function() { }    

    speechRecognizer.startRecognizing = function () {
        try {
        speechRecognizer.recognition.start();
        } catch (e) { }
    };
    speechRecognizer.stopRecognizing = function (abort) {
        if (abort) {
            speechRecognizer.recognition.abort();
        } else {
            speechRecognizer.recognition.stop();
        }
    };
}
