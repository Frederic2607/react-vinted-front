import React, { useState, useEffect } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: `${email}`,
          username: `${username}`,
          phone: `${phone}`,
          password: `${password}`,
        }
      );
      console.log(response.data);
    };
    fetchData();
  }, [data]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setData(data);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit}>
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
          <input type="checkbox" />
          <span>S'inscrire à notre newslettre</span>
          <input type="submit" value="S'inscrire"></input>
        </form>
      </div>
    </div>
  );
};

export default Signup;
