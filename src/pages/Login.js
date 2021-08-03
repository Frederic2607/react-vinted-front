import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={handleEmail} placeholder="email" />
        <input
          type="password"
          value={password}
          onChange={handlePassword}
          placeholder="password"
        />
        <input type="submit" value="Se Connecter"></input>
      </form>
    </div>
  );
};

export default Login;
