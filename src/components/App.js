import React from "react";
import PropTypes from "prop-types";
import Inventory from "./Inventory";
import Header from "./Header";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  // je recupere le panier (order) pour le store en cours via localStorage
  static propTypes = {
    match: PropTypes.object
  };
  componentDidMount() {
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );
    if (localStorageRef) {
      // je setstate ce panier (order)
      this.setState({ order: JSON.parse(localStorageRef) });
    }



    //je recupere et setstate les Fishes via Firebase (latence)
    const store = this.props.match.params.storeId;
    this.ref = base.syncState(`${store}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
    console.log("update");
  }

  state = {
    fishes: {},
    order: {}
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  };

  editFish = (editedFish, key) => {

    const fishes = { ...this.state.fishes };

    fishes[key] = editedFish

    this.setState({ fishes })
  }

  deleteFish = (key) => {

    const fishes = { ...this.state.fishes };
    fishes[key] = null
    this.setState({ fishes })




  }

  addToOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          editFish={this.editFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
