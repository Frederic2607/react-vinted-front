import "./Home.css";

import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import * as qs from "qs";
import Headband from "../../components/Headband/Headband";

const Home = (props) => {
  const { search, sort, rangeValues, token } = props;

  const [offers, setOffers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = qs.stringify({
        title: search,
        sort: sort ? "price-desc" : "price-asc",
        priceMin: rangeValues[0],
        priceMax: rangeValues[1],
      });
      const response = await axios.get(
        `https://fred-backend-vinted.herokuapp.com/offers?${queryParams}`
      );
      setOffers(response.data.offers);
      setIsLoading(false);
    };
    fetchData();
  }, [search, sort, rangeValues]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <div>
        <Headband token={token} />
      </div>
      <main className="container">
        {offers.map((offer, index) => (
          <div className="card-container">
            <Link
              to={`/offer/${offer._id}`}
              key={index}
              className="card-decoration"
            >
              <div className="card-username">
                <p>{offer.owner.account.username}</p>
              </div>
              <div>
                <img
                  className="card-img"
                  src={offer.product_image.url}
                  alt={`${offer._id}`}
                />
                <div className="card-infos">
                  <span>{offer.product_price} €</span>
                  <span>{offer.product_details[1].TAILLE}</span>
                  <span>{offer.product_details[0].MARQUE}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </main>
    </>
  );
};

export default Home;
