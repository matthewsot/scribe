var peer = new Peer({key: 'yhaxhyw8324ndn29'});

window.attendees = [ ];
window.clients = [ ];

peer.on('open', function (id) {
    window.attendees.push({ peerId: peer.id, name: "Host" });
    var createNew = confirm("Create new room?");
    window.isHost = createNew;
    if (createNew) {
        document.getElementById("status").textContent = "Room ID: " + id;
        peer.on('connection', function (client) {
            client.on('data', function (data) {
                if (typeof data == "string") {
                    attendees.push({ name: data, peerId: client.peer });
                    window.sendAllClients(attendees);
                } else {
                    window.handleClientMessage(data, client);
                }
            });
            console.log("Connected!");
            window.clients.push(client);
        });
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
