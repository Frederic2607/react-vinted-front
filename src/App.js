import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Headband from "./components/Headband";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import Publish from "./pages/Publish";

library.add(faSearch);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [search, setSearch] = useState("");

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

  return (
    <Router>
      <Header
        token={token}
        handleLogout={handleLogout}
        search={search}
        handleSearch={handleSearch}
      />
      <Switch>
        <Route exact path="/">
          <Headband />
          <Home />
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
