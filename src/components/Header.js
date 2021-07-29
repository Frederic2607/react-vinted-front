import React from "react";
import logoVinted from "../assets/img/logo-vinted.png";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { token, handleLogout } = props;

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img className="logo-img" src={logoVinted} alt="logo-vinted" />
          </Link>
        </div>
        <div className="search-content">
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher des articles"
          />
          <div>
            <div>
              <span>Trier par prix : </span>
              <span>
                <input type="text" />
              </span>
              <span>Prix entre : </span>
              <div className="cursor"></div>
            </div>
          </div>
        </div>
        <div>
          {token ? (
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/signup">
                <button className="signUp-btn">S'inscrire</button>
              </Link>
              <Link to="/login">
                <button className="login-btn">Se connecter</button>
              </Link>
            </div>
          )}
        </div>
        <button className="sold-btn">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
