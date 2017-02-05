function updateSpeech(data) {
    var attendee = window.attendees.filter(function (el) { return el.peerId == data.peerId })[0];
    var newLi = document.createElement("li");
    $(newLi).text(attendee.name + ": " + data.text);
    $("#transcript").append(newLi);
}

speechRecognizer.finalHypothesisCallback = function (hyp) {
    window.sendServerMessage({ forward: true, type: "command", command: "speech-update", text: hyp, peerId: peerId });
};
