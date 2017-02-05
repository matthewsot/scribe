var speechRecognizer = {};

speechRecognizer.startRecognizing = function () {
    startRecording();
};
speechRecognizer.hypothesisCallback = function (hyp) {
    console.log("New Hypothesis: " + hyp);
};
speechRecognizer.finalHypothesisCallback = function (hyp) {
    console.log("Final Hypothesis: " + hyp);
};
speechRecognizer.stopRecognizing = function () {
    stopRecording();
};
