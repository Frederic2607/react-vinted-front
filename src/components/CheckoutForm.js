import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = (props) => {
  const { totalPrice, productName } = props;

  const [succeed, setSucceed] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // Récupération des infos bancaire
      const cardElement = elements.getElement(CardElement);

      // Réception du toekn depuis Stripe
      const stripeResponse = await stripe.createToken(cardElement, {
        price: { totalPrice },
      });

      const stripeToken = stripeResponse.token.id;

      // Envoi du token au backend
      const response = await axios.post(
        "https://fred-backend-vinted.herokuapp.com/payment",
        {
          amount: totalPrice,
          productName: productName,
          stripeToken: stripeToken,
        }
      );
      if (response.data.status === "succeed") {
        setSucceed(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {succeed ? (
        <p>Paiement validé</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" disabled={!stripe}>
            Payer
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
