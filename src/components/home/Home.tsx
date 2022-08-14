import React from "react";
import "./Home.scss";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
function Home() {
  const title = "Hotel Ranking";
  const description = "Hotel Chain";
  return (
    <div className="home-container">
      <div className="wrapper">
        <Fade bottom>
          <div className="itemText">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </Fade>
        <div>
          <Fade bottom>
            <div className="buttonGroup">
              <Link className="button" to="/hotel-ranking">
                Hotel Ranking
              </Link>
              <Link className="button rightButton" to="/hotel-chain">
                Hotel Chain
              </Link>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}

export default Home;
