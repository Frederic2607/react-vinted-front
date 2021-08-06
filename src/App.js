import "../src/App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faSortNumericDown,
  faSortNumericDownAlt,
} from "@fortawesome/free-solid-svg-icons";

import Home from "./pages/Home";
import Offer from "./pages/Offer/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Publish from "./pages/Publish/Publish";
import Payment from "./pages/Payment/Payment";

library.add(faSearch, faSortNumericDown, faSortNumericDownAlt);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);
  const [rangeValues, setRangeValues] = useState([0, 2000]);
  const [finalRangeValues, setFinalRangeValues] = useState([0, 2000]);

  const handleLogin = (token) => {
    Cookies.set("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setToken("");
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSort = (event) => {
    setSort(event.target.checked);
  };

  const handleRange = (values) => {
    setRangeValues(values);
  };

  const handleFinalRange = (values) => {
    setFinalRangeValues(values);
  };

  return (
    <Router>
      <Header
        token={token}
        handleLogout={handleLogout}
        search={search}
        handleSearch={handleSearch}
        sort={sort}
        handleSort={handleSort}
        rangeValues={rangeValues}
        handleRange={handleRange}
        handleFinalRange={handleFinalRange}
      />

      <Switch>
        <Route exact path="/">
          <Home
            search={search}
            sort={sort}
            rangeValues={finalRangeValues}
            token={token}
          />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/signup">
          <Signup handleLogin={handleLogin} />
        </Route>
        <Route path="/login">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/publish">
          <Publish token={token} />
        </Route>
        <Route path="/payment">
          <Payment token={token} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
