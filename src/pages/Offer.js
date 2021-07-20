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
      const result = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setOffer(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      Hello {id}
      {isLoading ? (
        <div>En cours de chargement...</div>
      ) : (
        <div>
          <img src={offer.product_image.secure_url} alt={offer.product_name} />
        </div>
      )}
    </div>
  );
};

export default Offer;
