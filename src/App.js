import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignupPage from "./components/SignupPage";
import SuccessPage from "./components/SuccessPage";

const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyBjhFAlZFq4gc8W6pN5_fe8CWxF6z-FWvE",
  authDomain: "alavirus-61e7d.firebaseapp.com",
  databaseURL: "https://alavirus-61e7d.firebaseio.com",
  projectId: "alavirus-61e7d",
  storageBucket: "alavirus-61e7d.appspot.com",
  messagingSenderId: "339421294438",
  appId: "1:339421294438:web:d909961d563d3208c722a7",
  measurementId: "G-7KKSGJZ8V8"
};

firebase.initializeApp(firebaseConfig);

const functions = firebase.functions();

function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <Router>
        <Switch>
          <Route path="/success">
            <SuccessPage />
          </Route>
          <Route path={["/", "/signup"]}>
            <SignupPage onSubmit={functions.httpsCallable("signUp")} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
