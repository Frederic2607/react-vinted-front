import React from "react";
import logoVinted from "../assets/img/logo-vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { token, handleLogout, search, handleSearch } = props;

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img className="logo-img" src={logoVinted} alt="logo-vinted" />
          </Link>
        </div>
        <div className="search-content">
          <label className="search-bar">
            <FontAwesomeIcon icon="search" size="2x" className="search-icon" />
            <input
              type="text"
              className="search-input"
              value={search}
              onChange={handleSearch}
              placeholder="Rechercher des articles"
            />
          </label>
        </div>
        <div>
          {token ? (
            <div>
              <Link to="/">
                <button className="logout-btn" onClick={handleLogout}>
                  Se déconnecter
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/signup">
                <button className="signup-btn">S'inscrire</button>
              </Link>
              <Link to="/login">
                <button className="login-btn">Se connecter</button>
              </Link>
            </div>
          )}
        </div>
        <Link to="/publish">
          <button className="sold-btn">Vends tes articles</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
