import React, { Component } from "react";
import { formatPrice } from "../helpers";

class Order extends Component {
  // je crée une fonction render pour eviter de tout mettre dans le render de react directement
  renderOrder = key => {
    // je compte la quantite pour chaques sorte de poisson
    const count = this.props.order[key];
    const fish = this.props.fishes[key];
    const isAvailable = fish && fish.status === "available" ? true : false;

    // On verifie qu'il trouve bien le fish sinon on arrete là
    if (!fish) return null;

    // je render la sorte de poisson
    if (isAvailable) {
      // je compte le prix total par sorte de poisson
      const totalPrice = count * fish.price;
      return (
        <li key={key}>
          {count} lbs {fish.name}
          {formatPrice(count * fish.price)}
        </li>
      );
    } else {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : "fish"} is no longer available
        </li>
      );
    }
  };

  render() {
    //ici je calcule le total de la commande avec un reduce

    //mon panier
    const arrOrder = Object.keys(this.props.order);

    // je loop sur mon panier pour avoir le prix total en comptant le total par poisson
    const total = arrOrder.reduce((prevTotal, key) => {
      // je compte le nombre de posson pour chaques sorte de poisson
      const count = this.props.order[key];
      // le poisson
      const fish = this.props.fishes[key];
      // est il dispo ?
      const isAvailable = fish && fish.status === "available";
      // Si oui je compte le prix total pour ce poisson via la quantite
      if (isAvailable) {
        return prevTotal + fish.price * count;
      }

      // je retourne ce total
      return prevTotal;
    }, 0);

    // et je retourne une liste de sorte de fishes
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          {//je loop sur chaque sorte de poisson et je lance la fonction attribue à this.renderOrder)
          arrOrder.map(this.renderOrder)}
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
