import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Top from "./features/top/Top";
import Post from "./features/post/Post";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Top} />
          <Route path="/post/:id" component={Post} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
