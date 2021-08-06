import "./login.css";

import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = (props) => {
  const { handleLogin } = props;
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        // "https://lereacteur-vinted-api.herokuapp.com/user/login",
        "https://fred-backend-vinted.herokuapp.com/user/login",
        {
          email: `${email}`,
          password: `${password}`,
        }
      );
      if (response.data.token) {
        handleLogin(response.data.token);
        return history.push("/");
      } else {
        alert("Une erreur est survenue, veuillez ressayer");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            value={email}
            onChange={handleEmail}
            placeholder="Adresse email"
          />
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            placeholder="Mot de passe"
          />
          <input type="submit" value="Se Connecter"></input>
        </form>
        <Link to="/signup" className="link-signup">
          Pas encore de compte ? Inscris-toi !
        </Link>
      </div>
    </div>
  );
};

export default Login;
