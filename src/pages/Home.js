import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [offers, setOffers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setOffers(response.data.offers);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <main className="container">
      {offers.map((offer, index) => (
        <Link to={`/offer/${offer._id}`} key={offers._id}>
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
