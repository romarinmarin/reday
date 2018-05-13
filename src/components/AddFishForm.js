import React from "react"; import PropTypes from "prop-types";

class AddFishForm extends React.Component {
  myName = React.createRef();
  myPrice = React.createRef();
  myStatus = React.createRef();
  myDesc = React.createRef();
  myImage = React.createRef();

  static propTypes = {
    addFish: PropTypes.func
  };

  createFish = e => {
    e.preventDefault();
    // on crée un objet fish avec les input au submit

    const fish = {
      name: this.myName.value.value,
      price: this.myPrice.value.value,
      satus: this.myStatus.value.value,
      desc: this.myDesc.value.value,
      image: this.myImage.value.value
    };

    this.props.addFish(fish)
  };

  render() {
    return (

      <form className="fish-edit" onSubmit={this.createFish}>
        <input ref={this.myName} name="name" type="text" placeholder="Name" />
        <input
          ref={this.myPrice}
          name="price"
          type="text"
          placeholder="Price"
        />
        <select ref={this.myStatus} name="status">
          <option value="available">Fresh</option>
          <option value="unaivailable">Sold out !</option>
        </select>
        <textarea ref={this.myDesc} name="desc" placeholder="Desc" />
        <input
          ref={this.myImage}
          name="image"
          type="text"
          placeholder="Image"
        />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
