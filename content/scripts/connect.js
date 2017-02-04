window.peer = new Peer({ host: 'peerserver.mawteam.com', port: 80, path: '/' });

window.attendees = [ ];
window.clients = [ ];

peer.on('open', function (id) {
    window.switchWedgeContent("#landing-overlay");
    return;
});
