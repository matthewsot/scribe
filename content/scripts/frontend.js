$("body").on("keypress", "input", function (e) {
    if (e.which == 13) {
        var btn = $(this).siblings("button");
        if (btn.length) {
            btn.click();
        }
    }
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

wedge.show("#loading-overlay", { autoPositionType: 2, allowExit: false });

window.switchWedgeContent = function (newContent) {
    $("#wedge-content").children().hide().appendTo("body");
    $(newContent).show();
    $("#wedge-content").append($(newContent));
};

$("#create-meeting").click(function () {
    window.switchWedgeContent("#new-mtg-overlay");
});
$("#do-create-meeting").click(function () {
    window.attendees.push({ peerId: peer.id, name: $("#host-name").val().trim() });
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
