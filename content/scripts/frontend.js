window.isHost = false;

$("body").on("keypress", "input", function (e) {
    if (e.which == 13) {
        var btn = $(this).siblings("button");
        if (btn.length) {
            btn.click();
        }
    }
});

wedge.show("#loading-overlay", { autoPositionType: 2, allowExit: false });

$("#create-meeting").click(function () {
    window.switchWedgeContent("#new-mtg-overlay");
});
$("#do-create-meeting").click(function () {
    window.attendees.push({ peerId: peerId, name: $("#host-name").val().trim() });
    window.sendAllClients(attendees);
    window.isHost = true;
    $("#mtg-id").text(peer.id);
    peer.on('connection', function (client) {
        client.on('data', function (data) {
            if (typeof data.name == "string") {
                attendees.push({ name: data.name, peerId: data.peerId });
                window.sendAllClients(attendees);
            } else {
                window.handleClientMessage(data, client);
            }
        });
        console.log("Connected!");
        window.clients.push(client);
    });
    window.switchWedgeContent("#waiting-host-overlay");
});

$("#join-meeting").click(function () {
    window.switchWedgeContent("#join-mtg-overlay");
});
$("#do-join-meeting").click(function () {
    window.server = peer.connect($("#join-mtg-code").val().trim());
    window.server.on('data', function (data) {
        window.handleServerMessage(data);
    });
    window.server.on('open', function () {
        server.send({ name: $("#client-name").val().trim(), peerId: peerId });
        window.switchWedgeContent("#waiting-client-overlay");
    });
    window.switchWedgeContent("#loading-overlay");
});

$("#calibrate").click(function () {
    if ($(this).text().trim() == "Start Calibration") {
        window.sendServerMessage({ forward: true, type: "command", command: "start-calibration" });
    } else {
        window.sendServerMessage({ forward: true, type: "command", command: "stop-calibration" });
    }
});

$("#predict-speaker").click(function () {
    if ($("#predict-speaker").text().trim() == "Start") {
        window.sendServerMessage({ forward: true, type: "command", command: "start-speaker-rec" });
    } else {
        window.sendServerMessage({ forward: true, type: "command", command: "stop-speaker-rec" });
    }
});
