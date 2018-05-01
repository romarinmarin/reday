import React, { Component } from "react";
import { formatPrice } from "../helpers";

class Order extends Component {
  render() {
    //mon panier
    const arrOrder = Object.keys(this.props.order);

    // je loop sur mon panier pour avoir le prix total en comptant le total par poisson
    const total = arrOrder.reduce((prevTotal, key) => {
      // je compte le nombre de posson pour chaques sorte de poisson
      const count = this.props.order[key];
      // le poisson
      const fish = this.props.fishes[key];
      // est il dispo ?
      const isAvailable = fish.status === "available";
      // Si oui je compte le prix total pour ce poisson via la quantite
      if (isAvailable) {
        return prevTotal + fish.price * count;
      }

      // je retourne ce total
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          {//je loop sur chaque sorte de poisson
          arrOrder.map(key => {
            // je compte la quantite pour chaques sorte de poisson
            const count = this.props.order[key];
            const fish = this.props.fishes[key];
            const isAvailable = fish.status === "available";

            // je compte le prix total par sorte de poisson
            const totalPrice = count * fish.price;

            // je render la sorte de poisson
            if (isAvailable) {
              return (
                <li>
                  {key} : {formatPrice(totalPrice)}
                </li>
              );
            } else {
              return <li>Sorry produit indispo</li>;
            }
          })}
          <div className="total">
            Total:
            <strong>{formatPrice(total)}</strong>
          </div>
        </ul>
      </div>
    );
  }
}

export default Order;
