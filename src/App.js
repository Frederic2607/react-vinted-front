import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Headband from "./components/Headband";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || "");

  const handleLogin = (token) => {
    Cookies.set("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    Cookies.set("token");
    setToken("");
  };

  return (
    <Router>
      <Header token={token} handleLogout={handleLogout} />

      <Switch>
        <Route exact path="/">
          <Home />
          <Headband />
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
      </Switch>
    </Router>
  );
}

export default App;
