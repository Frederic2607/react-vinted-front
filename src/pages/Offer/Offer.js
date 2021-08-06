import "./offer.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();

  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://fred-backend-vinted.herokuapp.com/offer/${id}`
      );
      setOffer(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="offer-page">
          <div className="offer-container">
            <div className="offer-pictures">
              <img
                className="offer-picture"
                src={offer.product_image.secure_url}
                alt={offer.product_name}
              />
            </div>
            <div className="offer-infos">
              <div>
                <span className="offer-price">{offer.product_price} €</span>
                <ul className="offer-list">
                  {offer.product_details.map((detail, index) => {
                    const keys = Object.keys(detail);
                    return (
                      <li key={index} className="offer-list-infos">
                        <span>{keys[0]}</span>
                        <span>{detail[keys[0]]}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="split"></div>
              <div className="offer-content">
                <p className="offer-name">{offer.product_name}</p>
                <p className="offer-description">{offer.product_description}</p>
                <div className="offer-avatar">
                  <span>{offer.owner.account.username}</span>
                </div>
              </div>
              <Link to="/payment">
                <button>Acheter</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
