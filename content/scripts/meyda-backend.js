window.featureBuffer = [];
window.pushToFeatureBuffer = false;
function receiveFeatures(loudness) {
    if (pushToFeatureBuffer) {
        window.featureBuffer.push(loudness.total);
    }
}

var context = new AudioContext();
var sampleRate = context.sampleRate; //48000 on my machine
var samplesPerMs = sampleRate / 1000;
var bufferSize = 512;
navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function(mediaStream) {
    console.log("Success!");
    window.mediaStream = mediaStream;
    var features = [ "loudness" ];
    window.meydaAnalyzer = Meyda.createMeydaAnalyzer({
        "audioContext": context,
        "source": context.createMediaStreamSource(mediaStream),
        "bufferSize": bufferSize,
        "windowingFunction": "hamming",
        "featureExtractors": features,
        "callback": function (r) {
            console.log("Received features:");
            console.log(r);
        }
    });
    meydaAnalyzer.start(features);
    setInterval(function () {
        var got = meydaAnalyzer.get(features);
        if (got == null) return;
        receiveFeatures(got.loudness);
    }, (bufferSize / samplesPerMs));
}).catch(function(err) {
    console.log("Error");
    console.log(err);
});
