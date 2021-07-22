import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Headband from "./components/Headband";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Header />
      <Headband />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
