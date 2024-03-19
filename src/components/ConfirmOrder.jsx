import React from "react";
import "../Confirm.css";
import logo from "./logo.svg";

const OrderConfirm = () => {
  return (
    <div className="confirm-container">
      <h1>TEBRİKLER!</h1>
      <h1>SİPARİŞİNİZ ALINDI!</h1>
      <img className="logom1" src={logo} alt="logo" />
    </div>
  );
};

export default OrderConfirm;
