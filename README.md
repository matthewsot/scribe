# scribe
An automatic meeting transcription app.

# Issues & Workarounds
- Speech recognition from far-field microphones (the 'have a mic on the table' approach) is notoriously difficult and error-prone. Scribe will side-step this problem by making the practical assumption that all meeting attendees have a laptop or other device in front them, and then use the microphone from that device to provide a closer/slightly less noisy recording of their speech.
- Automatic speaker recognition can actually get very accurate, yet there are no 100% accuracy systems. Again, making the assumption that all attendees have a microphone facing them allows us to use the loudness data from the different microphones to determine much more accurately where a sound is most likely coming from.
- Communication will happen peer to peer over WebRTC/peer.js, with the thought that meeting recordings are private and thus probably shouldn't use a centralized server. For simplicity it will use peer.js, in the future I might do a more custom WebRTC implementation.
