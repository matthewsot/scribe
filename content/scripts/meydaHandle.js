$("#calibrate").click(function () {
    if ($(this).text().trim() == "Start Calibration") {
        window.sendServerMessage({ type: "command", command: "start-calibration" });
    } else {
        window.sendServerMessage({ type: "command", command: "stop-calibration" });
    }
});

$("#predict-speaker").click(function () {
    if ($("#predict-speaker").text().trim() == "Start Speaker Recognition Demo") {
        window.sendServerMessage({ type: "command", command: "start-speaker-rec" });
    } else {
        window.sendServerMessage({ type: "command", command: "stop-speaker-rec" });
    }
});
