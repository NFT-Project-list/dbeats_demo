import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import Noty from "noty";
import mojs from "@mojs/core";
import Track from "./component/track.component";
//import Navbar from "./component/navbar.component";
//import BottomBar from "./component/bottom-player.component";

import NFTFeed from "./component/nft.component";
//import Home from "./component/home.component";

import store from "./store";
import { Provider } from "react-redux";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "./component/Loader/Loader";
//import LandingPage from "./component/LandingPage/LandingPage";
import "./App.css";
import NavBar from "../src/component/Navbar/Navbar";

store.subscribe(() => console.log(store.getState()));

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    Noty.closeAll();
    // Do something before request is sent
    new Noty({
      type: "info",
      text: "Please Wait",
      theme: "metroui",
      layout: "bottomRight",
    }).show();
    return config;
  },
  function (error) {
    // Do something with request error
    Noty.closeAll();
    new Noty({
      type: "error",
      text: "Error :" + JSON.stringify(error),
      theme: "metroui",
      layout: "bottomLeft",
    }).show();

    return Promise.reject(error);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
    Noty.closeAll();
    // Add configurations here
    if (res.status === 201) {
      new Noty({
        type: "success",
        text: res.data,
        theme: "metroui",
        layout: "bottomRight",

        animation: {
          open: function (promise) {
            var n = this;
            var Timeline = new mojs.Timeline();
            var body = new mojs.Html({
              el: n.barDom,
              x: { 500: 0, delay: 0, duration: 500, easing: "elastic.out" },
              isForce3d: true,
              onComplete: function () {
                promise(function (resolve) {
                  resolve();
                });
              },
            });

            var parent = new mojs.Shape({
              parent: n.barDom,
              width: 200,
              height: n.barDom.getBoundingClientRect().height,
              radius: 0,
              x: { [150]: -150 },
              duration: 1.2 * 500,
              isShowStart: true,
            });

            n.barDom.style["overflow"] = "visible";
            parent.el.style["overflow"] = "hidden";

            var burst = new mojs.Burst({
              parent: parent.el,
              count: 10,
              top: n.barDom.getBoundingClientRect().height + 75,
              degree: 90,
              radius: 75,
              angle: { [-90]: 40 },
              children: {
                fill: "#EBD761",
                delay: "stagger(500, -50)",
                radius: "rand(8, 25)",
                direction: -1,
                isSwirl: true,
              },
            });

            var fadeBurst = new mojs.Burst({
              parent: parent.el,
              count: 2,
              degree: 0,
              angle: 75,
              radius: { 0: 100 },
              top: "90%",
              children: {
                fill: "#EBD761",
                pathScale: [0.65, 1],
                radius: "rand(12, 15)",
                direction: [-1, 1],
                delay: 0.8 * 500,
                isSwirl: true,
              },
            });

            Timeline.add(body, burst, fadeBurst, parent);
            Timeline.play();
          },
          close: function (promise) {
            var n = this;
            new mojs.Html({
              el: n.barDom,
              x: { 0: 500, delay: 10, duration: 500, easing: "cubic.out" },
              skewY: { 0: 10, delay: 10, duration: 500, easing: "cubic.out" },
              isForce3d: true,
              onComplete: function () {
                promise(function (resolve) {
                  resolve();
                });
              },
            }).play();
          },
        },
      }).show();
      console.log("Posted Successfully");
      console.log(res);
    }
    return res;
  },
  (err) => {
    Noty.closeAll();
    new Noty({
      type: "error",
      text: "Error received : " + JSON.stringify(err),
      theme: "metroui",
      layout: "bottomRight",
    }).show();
    return Promise.reject(err);
  }
);

//lazy loading
const VideoHome = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./component/Home/Home")), 1000);
  });
});

const PublicRoom = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./component/Room/PublicRoomPage")), 1000);
  });
});

const PlaybackRoom = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("./component/Room/PlaybackRoomPage")),
      1000
    );
  });
});

const UserRoom = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./component/Room/UserRoomPage")), 1000);
  });
});

const Profile = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./component/Profile/Profile")), 1000);
  });
});

const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./component/Login/Login")), 1000);
  });
});

ReactDOM.render(
  // Redux Store Provider
  <Provider store={store}>
    <Router>
      <Suspense fallback={<Loader />}>
        <NavBar />
        <Switch>
          <div>
            <Route path="/nft" exact component={() => <NFTFeed />} />
            <Route path="/" exact component={() => <VideoHome />} />

            <Route path="/upload" exact component={() => <App />} />
            <Route path="/music" exact component={() => <Track />} />

            {/* <Route exact path="/" component={LandingPage} /> */}
            <Route exact path="/loader" component={Loader} />
            {/* <Route exact path="/home" component={VideoHome} />  */}
            <Route exact path="/streamer/:roomID" component={UserRoom} />
            <Route exact path="/public/:username" component={PublicRoom} />
            <Route
              exact
              path="/playback/:username/:video_id"
              component={PlaybackRoom}
            />
            <Route exact path="/profile/:username" component={Profile} />
            <Route exact path="/login" component={Login} />
            {/* TODO: <Route exact path="*" component={PageNotFound} /> */}
          </div>
        </Switch>
      </Suspense>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
