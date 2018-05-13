import React from "react";
import PropTypes from 'prop-types'

import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class Inventory extends React.Component {
  static propTypes = {
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    editFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    fishes: PropTypes.object
  }
  render() {
    return (
      <div className="inventory">
        <h1>INVENTORY !! </h1>
        <EditFishForm deleteFish={this.props.deleteFish} editFish={this.props.editFish} fishes={this.props.fishes} />
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load Sample</button>
      </div>
    );
  }
}



export default Inventory;
