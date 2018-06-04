import React from "react";
import PropTypes from 'prop-types'
import { firebaseApp } from "../base";

import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base from "../base";
import firebase from 'firebase'

class Inventory extends React.Component {

  state = {
    uid: null,
    owner: null,
    email: null,
    password: null
  }

  static propTypes = {
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    editFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    fishes: PropTypes.object
  }


  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }
  // check owner
  authHandler = async authData => {

    const store = await base.fetch(this.props.storeId, { context: this })
    console.log(authData);
    if (!store.owner) {
      console.log('no owner');
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }

    this.setState({ uid: authData.user.uid, owner: store.owner || authData.user.uid })

  }
  // auth via fb / tw / github
  authentificate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler)
  }

  // logout
  desauthentificate = async () => {
    await firebaseApp.auth().signOut().then(() => {
      this.setState({ uid: null, })
    })
  }







  render() {

    const logout = <button onClick={this.desauthentificate}>logout</button>

    if (!this.state.uid) {
      return (
        <Login authentificate={this.authentificate} />
      )
    }

    if (this.state.uid !== this.state.owner) {

      return (<div>
        {logout}
        <p> Vous n'etes pas le owner du store</p>
      </div>
      )
    }

    return (
      <div className="inventory">
        {logout}
        <h1>INVENTORY !! </h1>
        <EditFishForm deleteFish={this.props.deleteFish} editFish={this.props.editFish} fishes={this.props.fishes} />
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load Sample</button>
      </div>
    );
  }
}



export default Inventory;


