window.sendAllClients = function (message) {
    for (var i = 0; i < window.clients.length; i++) {
        window.clients[i].send(message);
    }
    window.handleServerMessage(message);
};

window.handleClientMessage = function (data, client) {
    if (data.type == "command"/* && data.command == "start-calibration"*/) {
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
};

window.sendServerMessage = function (message) {
    if (window.isHost) {
        window.handleClientMessage(message, null);
    } else {
        window.server.send(message);
    }
};
