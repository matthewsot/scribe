peerId =  Math.round(Math.random() * 1000000000).toString();
window.peer = new Peer(peerId, { host: 'mas-peerserver.herokuapp.com', port: 443, path: '/' });

window.attendees = [ ];
window.clients = [ ];
window.connectedAlready = false;

peer.on('open', function (id) {
    if (window.connectedAlready) return;
    window.connectedAlready = true;
    window.switchWedgeContent("#landing-overlay");
});
peer.on('disconnected', function () {
    console.log("Disconnected, trying to reconnect...");
    peer.id = peerId;
    peer._lastServerId = peerId; //https://github.com/peers/peerjs/issues/265
    peer.reconnect();
});
peer.on("error", function (err) {
    console.log("Error.");
    console.log(err);
});
