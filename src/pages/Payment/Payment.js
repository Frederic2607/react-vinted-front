import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";

import "./Payment.css";

//Clé publique
const stripePromise = loadStripe(
  "pk_test_51JLodcFTc2lW5Lhwthzcpdi62Hf2YFKz88BMTDo8TqkivTscyJrv6pnzdGcnA7q0pcAGQ5Y5eYJ8tHuaLZRi2XeY00iLBNWfPx"
);

const Payment = (props) => {
  const { token } = props;
  const location = useLocation();
  const { productName, price, protectionFees, shippingFees, totalPrice } =
    location.state;

  // console.log(location);

  return token ? (
    <div className="payment-page">
      <div className="payment-page-container">
        <div className="payment-title">
          <span>Résumé de la commande</span>
        </div>
        <div className="payment-offer-content">
          <ul>
            <li>
              <span>Commande</span>
              <span>{price} €</span>
            </li>
            <li>
              <span>Frais de protection acheteurs</span>
              <span>{protectionFees} €</span>
            </li>
            <li>
              <span>Frais de port</span>
              <span>{shippingFees} €</span>
            </li>
          </ul>
        </div>
        <div className="split"></div>
        <div className="payment-offer-content">
          <ul>
            <li>
              <span>Total</span>
              <span>{totalPrice} €</span>
            </li>
          </ul>
        </div>
        <div className="payment-offer-content">
          <p>
            il ne vous reste plus qu'une étape pour vous offrir{" "}
            <span className="inBold">{productName}</span>. Vous allez payer{" "}
            <span className="inBold">{totalPrice}</span> € (frais de protection
            et de port inclus).
          </p>
          <Elements stripe={stripePromise}>
            <CheckoutForm totalPrice={totalPrice} productName={productName} />
          </Elements>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Payment;
