function startSpeakerRec() {
    window.loudnesses = window.attendees.map(function () { return 0; } );
    window.featureBuffer = [];
    window.pushToFeatureBuffer = true;
    $("#predict-speaker").text("Stop");
    window.speakerRecInterval = setInterval(function () {
        var curr_loudness = window.featureBuffer.reduce(function (acc, currVal, i, arr) { return acc + (currVal / arr.length) }, 0);
        window.featureBuffer = [];
        curr_loudness -= window.baselineLoudness;
        window.sendServerMessage({ forward: true, type: "command", command: "speaker-update", loudness: curr_loudness, peerId: peerId });
    }, 250);
}

var silenceTimeout = -1;

window.recognizingSpeech = false;
function updateSpeakerRec(data) {
    var attendee = window.attendees.filter(function (el) { return el.peerId == data.peerId })[0];
    window.loudnesses[window.attendees.indexOf(attendee)] = data.loudness;
    $("#predictions").html("");
    
    var sortedLoudnesses = loudnesses.slice();
    sortedLoudnesses.sort();
    sortedLoudnesses.reverse();

    for (var i = 0; i < sortedLoudnesses.length; i++) {
        var attendeeIndex = loudnesses.indexOf(sortedLoudnesses[i]);
        var currAttendee = window.attendees[attendeeIndex];
        var li = document.createElement("li");
        $(li).text(currAttendee.name + " - " + sortedLoudnesses[i]);
        $("#predictions").append(li);

        if (i == 0 && currAttendee.peerId == peerId) {
            //We're speaking!
            if (!recognizingSpeech && sortedLoudnesses[0] > 2) {
                recognizingSpeech = true;
                speechRecognizer.startRecognizing();
                clearTimeout(silenceTimeout);
                silenceTimeout = setTimeout(function () {
                    recognizingSpeech = false;
                    speechRecognizer.stopRecognizing();
                }, 1000);
            }
            if (sortedLoudnesses[0] - sortedLoudnesses[1] > 0.75) {
                clearTimeout(silenceTimeout);
                silenceTimeout = setTimeout(function () {
                    recognizingSpeech = false;
                    speechRecognizer.stopRecognizing();
                }, 1000);
            }
        } else if (i == 0) {
            //We're not speaking
            if (recognizingSpeech && (sortedLoudnesses[0] - sortedLoudnesses[1]) > 0.75) { //We want the delta to be more than 0.75 to decide that this isn't just silence
                recognizingSpeech = false;
                speechRecognizer.stopRecognizing();
            }
        }
    }
}
function stopSpeakerRec() {
    window.pushToFeatureBuffer = false;
    window.featureBuffer = [];
    $("#predict-speaker").text("Start");
    clearInterval(window.speakerRecInterval);
}
