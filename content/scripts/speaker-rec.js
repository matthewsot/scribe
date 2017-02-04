function startSpeakerRec() {
    window.loudnesses = window.attendees.map(function () { return 0; } );
    window.featureBuffer = [];
    window.pushToFeatureBuffer = true;
    $("#predict-speaker").text("Stop Speaker Recognition Demo");
    window.speakerRecInterval = setInterval(function () {
        var curr_loudness = window.featureBuffer.reduce(function (acc, currVal, i, arr) { return acc + (currVal / arr.length) }, 0);
        window.featureBuffer = [];
        curr_loudness -= window.baselineLoudness;
        window.sendServerMessage({ forward: true, type: "speaker-update", loudness: curr_loudness, peerId: peer.id });
    }, 2000);
}
function updateSpeakerRec(data) {
    var attendee = window.attendees.filter(function (el) { return el.peerId == data.peerId })[0];
    var li = $("li[data-id=\"" + data.peerId + "\"]");
    li.text(attendee.name + " - " + data.loudness);
    window.loudnesses[window.attendees.indexOf(attendee)] = data.loudness;
    var maxLoudness = window.loudnesses.reduce(function (acc, a) { return Math.max(acc, a); }, -10000);
    var maxLoudnessAttendeeIndex = window.loudnesses.indexOf(maxLoudness);
    $("li").removeClass("speaking");
    $("li[data-id=\"" + window.attendees[maxLoudnessAttendeeIndex].peerId + "\"]").addClass("speaking");
}
function stopSpeakerRec() {
    window.pushToFeatureBuffer = false;
    window.featureBuffer = [];
    $("#predict-speaker").text("Start Speaker Recognition Demo");
    clearInterval(window.speakerRecInterval);
}
