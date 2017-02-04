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
