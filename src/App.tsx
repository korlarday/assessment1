import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faTimes,
  faBars,
  faEllipsisV,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import Home from "./components/home/Home";
import Ranking from "./components/ranking/Ranking";
import HotelChain from "./components/hotelChain/HotelChain";

library.add(faTimes, faBars, faCoffee, faEllipsisV, faLocationArrow);

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
        <Route path="/hotel-chain">
          <HotelChain />
        </Route>
      </Router>
    </>
  );
}

export default App;
