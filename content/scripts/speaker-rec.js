function startSpeakerRec() {
    window.loudnesses = window.attendees.map(function () { return 0; } );
    window.featureBuffer = [];
    window.pushToFeatureBuffer = true;
    $("#predict-speaker").text("Stop Speaker Recognition Demo");
    window.speakerRecInterval = setInterval(function () {
        var curr_loudness = window.featureBuffer.reduce(function (acc, currVal, i, arr) { return acc + (currVal / arr.length) }, 0);
        window.featureBuffer = [];
        curr_loudness -= window.baselineLoudness;
        window.sendServerMessage({ forward: true, type: "command", command: "speaker-update", loudness: curr_loudness, peerId: peer.id });
    }, 250);
}
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
    }
}
function stopSpeakerRec() {
    window.pushToFeatureBuffer = false;
    window.featureBuffer = [];
    $("#predict-speaker").text("Start Speaker Recognition Demo");
    clearInterval(window.speakerRecInterval);
}
