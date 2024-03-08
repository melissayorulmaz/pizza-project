import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./components/MainPage";
import OrderList from "./components/OrderList";
import OrderConfirm from "./components/ConfirmOrder";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Route path="/order-list">
        <OrderList />
      </Route>
      <Route path="/order-confirm">
        <OrderConfirm />
      </Route>
    </Switch>
  );
};

export default App;
