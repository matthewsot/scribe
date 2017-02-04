window.sendAllClients = function (message) {
    for (var i = 0; i < window.clients.length; i++) {
        window.clients[i].send(message);
    }
    window.handleServerMessage(message);
};

window.handleClientMessage = function (data, client) {
    if (data.type == "command" || data.type == "speaker-update" /* && data.command == "start-calibration"*/) {
        window.sendAllClients(data);
    }
};

window.handleServerMessage = function (data) {
    if (data[0] != undefined && data[0].name != undefined) {
        window.attendees = data;
        document.getElementById("attendees").innerHTML = "";
        for (var i = 0; i < window.attendees.length; i++) {
            document.getElementById("attendees").innerHTML += "<li data-id=\"" + window.attendees[i].peerId + "\">" + window.attendees[i].name + "</li>";
        }
        return;
    }
    if (data.type == "command" && data.command == "start-calibration") {
        window.featureBuffer = [];
        window.pushToFeatureBuffer = true;
        document.getElementById("calibrate").textContent = "Stop Calibration";
        return;
    }
    if (data.type == "command" && data.command == "stop-calibration") {
        window.pushToFeatureBuffer = false;
        window.baselineLoudness = window.featureBuffer.reduce(function (acc, currVal, i, arr) { return acc + (currVal / arr.length) }, 0);
        alert("Baseline loudness: " + window.baselineLoudness);
        window.featureBuffer = [];
        document.getElementById("calibrate").textContent = "Start Calibration";
        return;
    }
    if (data.type == "command" && data.command == "start-speaker-rec") {
        window.loudnesses = window.attendees.map(function () { return 0; } );
        window.featureBuffer = [];
        window.pushToFeatureBuffer = true;
        $("#predict-speaker").text("Stop Speaker Recognition Demo");
        window.speakerRecInterval = setInterval(function () {
            var curr_loudness = window.featureBuffer.reduce(function (acc, currVal, i, arr) { return acc + (currVal / arr.length) }, 0);
            window.featureBuffer = [];
            curr_loudness -= window.baselineLoudness;
            window.sendServerMessage({ type: "speaker-update", loudness: curr_loudness, peerId: peer.id });
        }, 2000);
        return;
    }
    if (data.type == "speaker-update") {
        var attendee = window.attendees.filter(function (el) { return el.peerId == data.peerId })[0];
        var li = $("li[data-id=\"" + data.peerId + "\"]");
        li.text(attendee.name + " - " + data.loudness);
        window.loudnesses[window.attendees.indexOf(attendee)] = data.loudness;
        var maxLoudness = window.loudnesses.reduce(function (acc, a) { return Math.max(acc, a); }, -10000);
        var maxLoudnessAttendeeIndex = window.loudnesses.indexOf(maxLoudness);
        $("li").removeClass("speaking");
        $("li[data-id=\"" + window.attendees[maxLoudnessAttendeeIndex].peerId + "\"]").addClass("speaking");
    }
    if (data.type == "command" && data.command == "stop-speaker-rec") {
        window.pushToFeatureBuffer = false;
        window.featureBuffer = [];
        $("#predict-speaker").text("Start Speaker Recognition Demo");
        clearInterval(window.speakerRecInterval);
        return;
    }
};

window.sendServerMessage = function (message) {
    if (window.isHost) {
        window.handleClientMessage(message, peer.id);
    } else {
        window.server.send(message);
    }
};
