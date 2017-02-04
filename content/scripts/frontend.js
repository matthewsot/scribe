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

window.switchWedgeContent = function (newContent) {
    $("#wedge-content").children().hide().appendTo("body");
    $(newContent).show();
    $("#wedge-content").append($(newContent));
    $("#wedge-content").find("input").first().focus();
};

$("#create-meeting").click(function () {
    window.switchWedgeContent("#new-mtg-overlay");
});
$("#do-create-meeting").click(function () {
    window.attendees.push({ peerId: peer.id, name: $("#host-name").val().trim() });
    window.sendAllClients(attendees);
    window.isHost = true;
    $("#mtg-id").text(peer.id);
    peer.on('connection', function (client) {
        client.on('data', function (data) {
            if (typeof data == "string") {
                attendees.push({ name: data, peerId: client.peer });
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
        server.send($("#client-name").val().trim());
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
    if ($("#predict-speaker").text().trim() == "Start Speaker Recognition Demo") {
        window.sendServerMessage({ forward: true, type: "command", command: "start-speaker-rec" });
    } else {
        window.sendServerMessage({ forward: true, type: "command", command: "stop-speaker-rec" });
    }
});
