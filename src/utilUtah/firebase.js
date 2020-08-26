import firebase from 'firebase';

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCQwyw77hEIySyBZlMUy1o3y0G2InC0Q7Q",
    authDomain: "number-transfer-53afa.firebaseapp.com",
    databaseURL: "https://number-transfer-53afa.firebaseio.com",
    projectId: "number-transfer-53afa",
    storageBucket: "number-transfer-53afa.appspot.com",
    messagingSenderId: "845760315425",
    appId: "1:845760315425:web:b04cd90eb34b0c84e5a360",
    measurementId: "G-B09GEVMK0Z"
  };

  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();