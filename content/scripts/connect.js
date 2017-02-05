window.peer = new Peer({ host: 'mas-peerserver.herokuapp.com', port: 443, path: '/' });

window.attendees = [ ];
window.clients = [ ];

peer.on('open', function (id) {
    window.switchWedgeContent("#landing-overlay");
    return;
});
