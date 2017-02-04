# Scribe
An automatic meeting transcription app.

# Status
A rough version of the speaker recognition system is currently working, with near-100% accuracy when I test it with two client computers. After cleaning up the speaker recognition code I will start on the speech recognition integration.

# Testing it
To test Scribe, simply download the repository, start a web server, and browse to the `index.html` page. The setup process is currently somewhat confusing, so follow these steps:

### For the host:
1. Press "OK" on the first prompt to create a new meeting room
2. Send the room ID to others in your meeting

### For the clients/other attendees:
1. Press "Cancel" on the first prompt to indicate you would like to join an existing meeting
2. Enter the room ID provided by the meeting host
3. Enter your name

Next, press the "Start Calibration" button and wait in silence for a few secondswhile the system identifies baseline noise levels for the different microphones.

Finally, press "Start Speaker Recognition Demo" to begin the speaker recognition demo. The bolded attendee is the identified speaker, and the " - #" shows the Meyda computed total loudness for the attendee.

# Issues & Workarounds
- Speech recognition from far-field microphones (the 'have a mic on the table' approach) is notoriously difficult and error-prone. Scribe will side-step this problem by making the practical assumption that all meeting attendees have a laptop or other device in front them, and then use the microphone from that device to provide a closer/slightly less noisy recording of their speech.
- Automatic speaker recognition can actually get very accurate, yet there are no 100% accuracy systems. Again, making the assumption that all attendees have a microphone facing them allows us to use the loudness data from the different microphones to determine much more accurately where a sound is most likely coming from.
- Communication will happen peer to peer over WebRTC/peer.js, with the thought that meeting recordings are private and thus probably shouldn't use a centralized server. For simplicity it will use peer.js, in the future I might do a more custom WebRTC implementation.
