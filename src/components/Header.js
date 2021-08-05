import React from "react";
import logoVinted from "../assets/img/logo-vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import CheckedSortDown from "./CheckedSortDown";
import CheckedSortUp from "./CheckedSortUp";
import { Range, getTrackBackground } from "react-range";

const Header = (props) => {
  const {
    token,
    handleLogout,
    search,
    handleSearch,
    sort,
    handleSort,
    rangeValues,
    handleRange,
    handleFinalRange,
  } = props;

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
          <div className="search-option">
            <span className="sort-text">Trier par prix:</span>
            <label>
              <Toggle
                defaultChecked={sort}
                icons={{
                  checked: <CheckedSortUp />,
                  unchecked: <CheckedSortDown />,
                }}
                onChange={handleSort}
                className="sort-toggle"
              />
            </label>
            <span className="price-filter-text">Prix entre:</span>
            <Range
              values={rangeValues}
              step={10}
              min={0}
              max={2000}
              onChange={(values) => handleRange(values)}
              onFinalChange={(values) => handleFinalRange(values)}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: "36px",
                    display: "flex",
                    width: "50%",
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "5px",
                      width: "100%",
                      borderRadius: "4px",
                      background: getTrackBackground({
                        values: rangeValues,
                        colors: ["#ccc", "#09b0ba", "#ccc"],
                        min: 0,
                        max: 2000,
                      }),
                      alignSelf: "center",
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ index, props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "15px",
                    width: "15px",
                    borderRadius: "50%",
                    backgroundColor: "#FFF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 2px 6px #AAA",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-28px",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "14px",
                      fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                      padding: "4px",
                      borderRadius: "4px",
                      backgroundColor: "#09b0ba",
                    }}
                  >
                    {rangeValues[index] + "€"}
                  </div>
                </div>
              )}
            />
          </div>
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
