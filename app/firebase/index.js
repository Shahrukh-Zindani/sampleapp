import firebase from 'firebase';

try {
	 var config = {
    apiKey: "AIzaSyCmGivy81o9yGcrBZ2OmliKtZb8f1ICmDc",
    authDomain: "studentmanager-8af26.firebaseapp.com",
    databaseURL: "https://studentmanager-8af26.firebaseio.com",
    storageBucket: "studentmanager-8af26.appspot.com",
    messagingSenderId: "950504001380"
  };
  firebase.initializeApp(config);
} catch (e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;