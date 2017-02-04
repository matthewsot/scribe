# Code
This is a pretty general overview of how the code works, since sometimes this P2P communication can get complicated.

# P2P Client/Server Model
To simplify things, peers are organized in a client/server model. The first peer, who creates the meeting and is the meeting 'host,' is designated to be the server which all other clients connect to. The host's peer ID becomes the "room ID" for new attendees to connect to.

Upon connecting (handled in ``content/scripts/connect.js``), clients send the server their own name, which the server stores in its local attendee array and then copies to all of its clients.

Commands or updates that should be sent to all attendees are handled by sending them to the server which then sends them to all clients.

Additionally, after initial connection the 'host' acts like a client to itself. All messages to the server are performed with ``sendServerMessage`` in ``content/scripts/messageHandler.js``, which will send the message to the host server (if the current computer is a client) or forward directly into the server callback (if the current computer is the host/server). This makes it somewhat simpler to think of and work with the client/server relationship.
