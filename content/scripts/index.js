var peer = new Peer({key: 'yhaxhyw8324ndn29'});

window.attendees = [ ];
window.clients = [ ];

peer.on('open', function (id) {
    var createNew = confirm("Create new room?");
    window.isHost = createNew;
    if (createNew) {
        alert("Room ID: " + id);
        peer.on('connection', function(client) {
            console.log("Connected!");
            window.clients.push(client);
              client.on('data', function(data) {
                  if (typeof data == "string") {
                      console.log(data);
                      attendees.push({ name: data, peerId: client.id });
                      for (var i = 0; i < window.clients.length; i++) {
                          window.clients[i].send(attendees);
                      }
                      console.log(attendees);
                  } else {
                      window.handleClientMessage(data, client);
                  }
              });
        });
    } else {
        var peerId = prompt("Enter room ID");
        window.name = prompt("What's your name?");
        window.server = peer.connect(peerId);
        window.server.on('data', function (data) {
            console.log(data);
            if (data[0].name != undefined) {
                window.attendees = data;
                console.log(attendees);
            } else {
                window.handleServerMessage(data);
            }
        });
        window.server.on('open', function() {
            server.send(name);
        });
    }
});
