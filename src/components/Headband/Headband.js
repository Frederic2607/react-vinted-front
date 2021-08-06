import "./Headband.css";

import React from "react";
import { Link } from "react-router-dom";

const Headband = ({ token }) => {
  return (
    <div className="headBand-img">
      <div className="container">
        <div className="headband-sold">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          {token ? (
            <Link to="/publish">
              <button>Commencer à vendre</button>
            </Link>
          ) : (
            <Link to="/login">
              <button>Commencer à vendre</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Headband;
