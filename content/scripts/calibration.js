function startCalibration() {
    window.featureBuffer = [];
    window.pushToFeatureBuffer = true;
    document.getElementById("calibrate").textContent = "Stop Calibration";
}
function stopCalibration() {
    window.pushToFeatureBuffer = false;
    window.baselineLoudness = window.featureBuffer.reduce(function (acc, currVal, i, arr) { return acc + (currVal / arr.length) }, 0);
    window.featureBuffer = [];
    document.getElementById("calibrate").textContent = "Start Calibration";
}