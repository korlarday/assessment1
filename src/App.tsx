import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.scss';
import Header from './components/header/Header';
import { library } from "@fortawesome/fontawesome-svg-core";
// import { times } from "@fortawesome/free-brands-svg-icons";
import { faCoffee, faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import Home from './components/home/Home';
import Ranking from "./components/ranking/Ranking";
import { useState } from 'react';

library.add(faTimes, faBars, faCoffee); 

function App() {
  return (
    <>
    <Router>
      <Header />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/hotel-ranking">
        <Ranking />
      </Route>
    </Router>
    </>
  );
}

export default App;
