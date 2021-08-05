import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Signup.css";

const Signup = (props) => {
  const { handleLogin } = props;
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePhone = (event) => {
    setPhone(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    if (!email) {
      setEmailError("Mandatory email");
    }
    try {
      event.preventDefault();
      const response = await axios.post(
        // "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        "https://fred-backend-vinted.herokuapp.com/user/signup",
        {
          email: `${email}`,
          username: `${username}`,
          phone: `${phone}`,
          password: `${password}`,
        }
      );
      if (response.data.token) {
        handleLogin(response.data.token);
        return history.push("/");
      } else {
        alert("An error has occured");
      }
    } catch (error) {
      if (error.response.status === 409) {
        alert(error.response.data.message);
      }
    }

    setData(data);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={handleUsername}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />
          <input
            type="tel"
            placeholder="Numéro de téléphone"
            value={phone}
            onChange={handlePhone}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handlePassword}
          />
          <div className="checkbox-container">
            <div className="signup-checkbox">
              <input type="checkbox" />
              <span>S'inscrire à notre newslettre</span>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>

          <input type="submit" value="S'inscrire"></input>
        </form>
        <Link to="/login" className="link-login">
          Tu as déjà un compte ? Connecte-toi !
        </Link>
      </div>
    </div>
  );
};

export default Signup;
