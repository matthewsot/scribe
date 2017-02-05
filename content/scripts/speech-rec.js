function updateSpeech(data) {
    var attendee = window.attendees.filter(function (el) { return el.peerId == data.peerId })[0];
    var newLi = document.createElement("li");
    $(newLi).text(attendee.name + ": " + data.text);
    $("#transcript").append(newLi);
}

speechRecognizer.finalHypothesisCallback = function (hyp) {
    if (hyp.trim().length > 0) {
        window.sendServerMessage({ forward: true, type: "command", command: "speech-update", text: hyp, peerId: peerId });
    }
};

//Prime the speech recognition with ~0.5s of previous data
setInterval(function () {
    if (window.recognizingSpeech) return;
    if (!webkitSpeechRecognition) {
        speechRecognizer.stopRecognizing();
        speechRecognizer.startRecognizing();
    } else {
        speechRecognizer.recognition.onend = function () {
            speechRecognizer.recognition.start();
            //speechRecognizer.recognition.onend = null;
        }
        speechRecognizer.recognition.end();
    }
}, 1000);
