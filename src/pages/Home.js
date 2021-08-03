import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import * as qs from "qs";

const Home = (props) => {
  const { search, sort } = props;

  const [offers, setOffers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = qs.stringify({
        title: search,
        sort: sort ? "price-desc" : "price-asc",
      });
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?${queryParams}`
      );
      setOffers(response.data.offers);
      setIsLoading(false);
    };
    fetchData();
  }, [search, sort]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <main className="container">
      {offers.map((offer, index) => (
        <Link to={`/offer/${offer._id}`} key={index}>
          <div>
            <div className="card-container">
              <div className="card-username">
                <span>{offer.owner.account.username}</span>
              </div>
              <div>
                <img
                  className="card-img"
                  src={offer.product_image.url}
                  alt={`${offer._id}`}
                />
                <div className="card-infos">
                  <span>{offer.product_price}</span>
                  <span>{offer.product_details[1].TAILLE}</span>
                  <span>{offer.product_details[0].MARQUE}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
};

export default Home;
