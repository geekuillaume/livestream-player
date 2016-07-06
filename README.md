# Livestream code assignment

This is a video player created in JS for the code assignment of Livestream.

I used [React](https://github.com/facebook/react) with [Redux](https://github.com/reactjs/redux) to handle the DOM and the interface of the player. The scaffolding of the app is from mxstbr's [react-boilerplate](https://github.com/mxstbr/react-boilerplate) project. I changed some things from it to remove unnecessary parts. It is communicating with Livestream API.

The video is played from the HLS stream using [HLS.js](https://github.com/dailymotion/hls.js) without using any Flash component. It handles live streams and VoD.
