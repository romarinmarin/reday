import React from "react";
import PropTypes from 'prop-types'


class PickStore extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };
  myInput = React.createRef();

  goStore = e => {
    e.preventDefault();
    const storeName = this.myInput.value.value;
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form onSubmit={this.goStore} className="store-selector">
        <h2>Choose a store</h2>
        <input ref={this.myInput} type="text" placeholder="Choose a store" />
        <button type="submit">Visite Store -></button>
      </form>
    );
  }
}

export default PickStore;
