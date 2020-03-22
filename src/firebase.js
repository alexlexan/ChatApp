import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
  apiKey: "AIzaSyBAr3_mO4aYNe8XWgabcyiEPFZx9WziZY8",
  authDomain: "react-slack-5327c.firebaseapp.com",
  databaseURL: "https://react-slack-5327c.firebaseio.com",
  projectId: "react-slack-5327c",
  storageBucket: "react-slack-5327c.appspot.com",
  messagingSenderId: "110127715168",
  appId: "1:110127715168:web:c3b0abea5fa88e849b8405"
};
firebase.initializeApp(config);

export default firebase;
