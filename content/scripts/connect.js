window.peer = new Peer({key: 'yhaxhyw8324ndn29'});

window.attendees = [ ];
window.clients = [ ];

peer.on('open', function (id) {
    window.switchWedgeContent("#landing-overlay");
    return;
    var createNew = confirm("Create new room?");
    window.isHost = createNew;
    if (createNew) {
    } else {
        var peerId = prompt("Enter room ID");
        window.name = prompt("What's your name?");
        window.server = peer.connect(peerId);
        window.server.on('data', function (data) {
            window.handleServerMessage(data);
        });
        window.server.on('open', function () {
            server.send(name);
        });
    }
});
