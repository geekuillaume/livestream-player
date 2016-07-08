# Livestream code assignment

This is a video player created in JS for the code assignment of Livestream.

I used [React](https://github.com/facebook/react) with [Redux](https://github.com/reactjs/redux) to handle the DOM and the interface of the player. The scaffolding of the app is from mxstbr's [react-boilerplate](https://github.com/mxstbr/react-boilerplate) project. I changed some things from it to remove unnecessary parts. It is communicating with Livestream API.

The video is played from the HLS stream using [HLS.js](https://github.com/dailymotion/hls.js) without using any Flash component. It handles live streams and VoD.

## Instructions

The player is full HTML5 and uses React. To use it in production you need to compile all the resources with Babel and Webpack. To do so, you first need NodeJS installed on your machine.

Then, simply install the dependancies of the project with `npm install`.

You can now use the `npm start` command to start a local development server with Hot-Reloading enabled.

For production, use the `npm run build` to compile, optimize and minify everything. You'll get all the files in the `build` folder. It will also execute the tests (there are none for the moment, but it still serve as a way to check that the page can load) and generate a coverage summary.

## Code Organization

 - `internals/` contains everything needed for the scripts and tools used to build and execute the project.
 - `server/` contains the code of a basic NodeJS server used during development for Hot reloading
 - `app/` is where everything happens
  - `index.html` is the only HTML file that is going to be sent to the client, it's quite empty because Webpack is going to add a lot of things in it during the build process
  - `app.js` is where React is loaded on the page and where the other part of the app are initiated
  - `store.js` contains the code related to Redux initiation
  - `config.js` is a basic JS object containing the sitewide configuration
  - `utils/` contains basic functions that are used at multiple location in the app
  - `redux/` contains the Redux reducers used to handle event (API calls, ...) and manage the data store
  - `components/` is where the React components are located. Each JS file contains a React component associated in some case with an `assets/` folder for the static images, logo, etc related to this component. There is also `styles.css` files containing specific classes for the component (the classes' name are rewritten to prevent namespace problems). Lastly, a component folder can also contain another `components/` folder for inner components.

---

You can have more informations about the tools included in this repository by directly looking at the [documentation of the boilerplate](https://github.com/mxstbr/react-boilerplate/tree/master/docs) used here.

If you have CORS problems, you can use the domain name `local.livestream.com` (redirected to `127.0.0.1` in your `hosts` file) or use an browser extension to temporary disable CORS features (like this [extension for Chrome](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi))

## Creator

This project has been created by Guillaume Besson. All rights are reserved.
