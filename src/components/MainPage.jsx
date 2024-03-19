import React from "react";
import { Link } from "react-router-dom";
import "../MainPage.css";
import logo from "./logo.svg";

const MainPage = () => {
  return (
    <div className="main">
      <div className="logo-p">
        <img className="logom" src={logo} alt="logo" />
      </div>
      <h2 className="main-heading">KOD ACIKTIRIR</h2>
      <h2 className="main-h">PİZZA DOYURUR</h2>
      <Link to="/order-list" className="aciktim">
        ACIKTIM
      </Link>
    </div>
  );
};

export default MainPage;
