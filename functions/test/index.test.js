const test = require("firebase-functions-test")(
  {
    databaseURL: "https://alavirus-61e7d.firebaseio.com",
    projectId: "alavirus-61e7d",
    storageBucket: "alavirus-61e7d.appspot.com"
  },
  "alavirus-61e7d-firebase-adminsdk-qrhzr-8314323fea.json"
);

const functions = require("../index.js");

// *** Test Sending the Daily Email ***
const dailyEmailTest = test.wrap(functions.dailyEmail);

dailyEmailTest();
// *** End Daily Email Test ***

// clean up anything created by testing
test.cleanup();
