import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCn2WtJl6puu34z-dVPc0T_JXrdAHybmwU",
    authDomain: "olx-clone-7a4e5.firebaseapp.com",
    projectId: "olx-clone-7a4e5",
    storageBucket: "olx-clone-7a4e5.appspot.com",
    messagingSenderId: "583065786279",
    appId: "1:583065786279:web:b7a57014de91f7b5eb0882",
    measurementId: "G-E7LLCTM2FJ"
  };

export default firebase.initializeApp(firebaseConfig)