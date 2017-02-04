# Scribe
An automatic meeting transcription app.

# Status
A rough version of the speaker recognition system is currently working, with near-100% accuracy when I test it with two client computers. After cleaning up the speaker recognition code I will start on the speech recognition integration.

# Testing it
To test Scribe, simply download the repository, start a web server, and browse to the `index.html` page. The setup process is currently somewhat confusing, so follow these steps:

### For the host:
1. Press "I'm starting a new meeting" on the first prompt and enter your name
2. Send the meeting code to others in your meeting
3. Once all attendees have joined, ask everyone to stay silent and press "Start Calibration." After about 10 seconds, press "Stop Calibration"
4. Press "Start Speaker Recognition Demo" to start the speaker recognition demo

### For the clients/other attendees:
1. Press "I have a meeting code" on the first prompt to indicate you would like to join an existing meeting
2. Enter the meeting code provided by the meeting host along with your name
3. Press "Join Meeting" and follow the prompts until the meeting begins

# Issues & Workarounds
- Speech recognition from far-field microphones (the 'have a mic on the table' approach) is notoriously difficult and error-prone. Scribe will side-step this problem by making the practical assumption that all meeting attendees have a laptop or other device in front them, and then use the microphone from that device to provide a closer/slightly less noisy recording of their speech.
- Automatic speaker recognition can actually get very accurate, yet there are no 100% accuracy systems. Again, making the assumption that all attendees have a microphone facing them allows us to use the loudness data from the different microphones to determine much more accurately where a sound is most likely coming from.
- Communication will happen peer to peer over WebRTC/peer.js, with the thought that meeting recordings are private and thus probably shouldn't use a centralized server. For simplicity it will use peer.js, in the future I might do a more custom WebRTC implementation.
