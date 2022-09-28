import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyD_t3HX8d5vFvI6N_AH2_JAN---dOuMJdQ",
  authDomain: "vciso-messagerie-1.firebaseapp.com",
  projectId: "vciso-messagerie-1",
  storageBucket: "vciso-messagerie-1.appspot.com",
  messagingSenderId: "725816472766",
  appId: "1:725816472766:web:66970c4a3d78b6a6f79aef"
};

const whatsApp = firebase.initializeApp(firebaseConfig);

const db = whatsApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { provider, auth };
