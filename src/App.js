import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Headband from "./components/Headband";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import Publish from "./pages/Publish";

library.add(faSearch, faArrowDown, faArrowUp);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);

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

  return (
    <Router>
      <Header
        token={token}
        handleLogout={handleLogout}
        search={search}
        handleSearch={handleSearch}
        sort={sort}
        handleSort={handleSort}
      />
      <Switch>
        <Route exact path="/">
          <Headband sort={sort} handleSort={handleSort} />
          <Home search={search} sort={sort} />
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
      </Switch>
    </Router>
  );
}

export default App;
