import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCVCiQghXL0jJlZjqTueYhdh3eR15TVWKg",
  authDomain: "reday-fe52f.firebaseapp.com",
  databaseURL: "https://reday-fe52f.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
