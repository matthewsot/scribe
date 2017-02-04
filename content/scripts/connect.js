window.peer = new Peer({key: 'yhaxhyw8324ndn29'});

window.attendees = [ ];
window.clients = [ ];

peer.on('open', function (id) {
    window.switchWedgeContent("#landing-overlay");
    return;
});
