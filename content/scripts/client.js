window.handleServerMessage = function (data) {
    if (data[0] != undefined && data[0].name != undefined) {
        window.attendees = data;
        document.getElementById("attendees").innerHTML = "";
        for (var i = 0; i < window.attendees.length; i++) {
            document.getElementById("attendees").innerHTML += "<li data-id=\"" + window.attendees[i].peerId + "\">" + window.attendees[i].name + "</li>";
        }
        return;
    }
    if (data.type == "command") {
        var commands = {
            "start-calibration": startCalibration,
            "stop-calibration": stopCalibration,
            "start-speaker-rec": startSpeakerRec,
            "speaker-update": updateSpeakerRec,
            "stop-speaker-rec": stopSpeakerRec
        };
        commands[data.command](data);
    }
};

window.sendServerMessage = function (message) {
    if (window.isHost) {
        window.handleClientMessage(message, peer.id);
    } else {
        window.server.send(message);
    }
};
