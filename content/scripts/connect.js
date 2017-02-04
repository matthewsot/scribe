if (navigator.vendor != "Google Inc.") {
    alert("Sorry, but Scribe is having a lot of trouble with non-Chrome browsers right now. If something doesn't work, please consider loading this page in Chrome.");
}
window.peer = new Peer({ host: 'peerserver.mawteam.com', port: 443, path: '/' });

window.attendees = [ ];
window.clients = [ ];

peer.on('open', function (id) {
    window.switchWedgeContent("#landing-overlay");
    return;
});
