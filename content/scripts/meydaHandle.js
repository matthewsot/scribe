document.getElementById("calibrate").onclick = function () {
    if (document.getElementById("calibrate").textContent.trim() == "Start Calibration") {
        window.sendServerMessage({ type: "command", command: "start-calibration" });
    } else {
        window.sendServerMessage({ type: "command", command: "stop-calibration" });
    }
};
