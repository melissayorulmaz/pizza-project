import React from "react";
import { Link } from "react-router-dom";
import "../MainPage.css";
import logo from "./logo.svg";

const MainPage = () => {
  return (
    <div className="main">
      <img className="logo" src={logo} alt="logo" />
      <h1 className="main-heading">Kod Acıktırır Pizza Doyurur</h1>
      <Link to="/order-list" className="aciktim">
        Acıktım
      </Link>
    </div>
  );
};

export default MainPage;
