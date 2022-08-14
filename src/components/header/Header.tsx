import React, { useEffect, useState } from "react";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Header = () => {
  const [burgerStatus, setBurgerStatus] = useState(false);
  let location = window.location.pathname;
  useEffect(() => {}, [location]);
  return (
    <div className="header-container">
      <Link to="/">Hotel Ranking</Link>

      <div className="menu">
        <Link to="/hotel-chain" className="navStyle"></Link>
      </div>

      <div className="rightMenu">
        <Link to="/" className="navStyle tempMenu">
          Home
        </Link>
        <Link to="/hotel-ranking" className="navStyle tempMenu">
          Ranking
        </Link>
        <Link to="/hotel-chain" className="navStyle tempMenu">
          Hotel Chain
        </Link>
        <FontAwesomeIcon
          className="pointer"
          icon="bars"
          onClick={() => setBurgerStatus(true)}
        />
      </div>

      <div
        className="burgerNav"
        style={{
          transform: burgerStatus ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="closeWrapper">
          <FontAwesomeIcon
            icon="times"
            onClick={() => setBurgerStatus(false)}
          />
        </div>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/hotel-ranking">Hotel Ranking</Link>
        </li>
        <li>
          <Link to="/hotel-chain">Hotel Chain</Link>
        </li>
      </div>
    </div>
  );
};

export default Header;
