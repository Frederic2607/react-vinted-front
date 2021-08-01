import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();

  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
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
        <div>
          <img src={offer.product_image.secure_url} alt={offer.product_name} />

          <div>
            {offer.product_price}
            {offer.product_details.map((detail, index) => {
              console.log(detail);

              const keys = Object.keys(detail);

              return (
                <div key={index}>
                  {keys[0]}: {detail[keys[0]]}
                </div>
              );
            })}
            {offer.product_name}
            {offer.product_description}
            {offer.owner.account.username}
          </div>
          <button>Acheter</button>
        </div>
      )}
    </div>
  );
};

export default Offer;
