import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <h1>Kod Acıktırır Pizza Doyurur</h1>
      <Link to="/order-list">Acıktım</Link>
    </div>
  );
};

export default MainPage;
