// your personal google API keys
const API_KEY = "";
const CALLBACK_NAME = "gmapsCallback";

let initialized = !!window.google;
let resolveInit;
let rejectInit;

// this primise handles the initialization
// status of the google maps script
const initPromise = new Promise((resolve, reject) => {
  resolveInit = resolve;
  rejectInit = reject;
});

export default function init() {
  // if google maps already is initialized
  // the `initPromise` should get resolved eventsually
  if (initialized) {
    return initPromise;
  }

  initialized = true;

  // the callback function is called by the google maps script
  // if it is successfully loaded.
  window[CALLBACK_NAME] = () => resolveInit(window.google);

  // we inject a new script tag into the `<head>`
  // of out HTML to load Google Maps script.
  const script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`;
  script.onerror = rejectInit;

  document.querySelector("head").appendChild(script);

  return initPromise;
}
