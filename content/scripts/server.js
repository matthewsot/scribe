window.sendAllClients = function (message) {
    for (var i = 0; i < window.clients.length; i++) {
        window.clients[i].send(message);
    }
    window.handleServerMessage(message);
};
window.handleClientMessage = function (data, client) {
    if (data.forward) {
        window.sendAllClients(data);
    }
};
