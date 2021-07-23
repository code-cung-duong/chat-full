import firebase from 'firebase'
import 'firebase/firebase-analytics'
import 'firebase/firebase-auth'
import 'firebase/firestore'
// var firebaseConfig = {
//     apiKey: "AIzaSyBlm-W6GLaMQFC4PCEMMZ61AaNFmBh6DdY",
//     authDomain: "chat-app-hihi.firebaseapp.com",
//     projectId: "chat-app-hihi",
//     storageBucket: "chat-app-hihi.appspot.com",
//     messagingSenderId: "883987244279",
//     appId: "1:883987244279:web:aaae422fdb9a61e9669ff2",
//     measurementId: "G-L65WGMD5Y7"
//   };
// var firebaseConfig = {
//   apiKey: "AIzaSyA_e-n7F2-TuPYmtR2esNbF8JdNBH68tA0",
//   authDomain: "test2-16c93.firebaseapp.com",
//   databaseURL: "https://test2-16c93-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "test2-16c93",
//   storageBucket: "test2-16c93.appspot.com",
//   messagingSenderId: "722433601661",
//   appId: "1:722433601661:web:334cf267eff8011b314114",
//   measurementId: "G-H1V9SXWTYG"
// };
// var firebaseConfig = {
//   apiKey: "AIzaSyCMalP2c93tTuv7CkYwNWFlZbYbsgEH7H4",
//   authDomain: "test-6005a.firebaseapp.com",
//   databaseURL: "https://test-6005a-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "test-6005a",
//   storageBucket: "test-6005a.appspot.com",
//   messagingSenderId: "338429252315",
//   appId: "1:338429252315:web:27005b190518aa436fb2fe",
//   measurementId: "G-45V80CP43R"
// };
// Initialize Firebase

var firebaseConfig = {
  apiKey: "AIzaSyCT6UcJ1fSROa6XrtINMkdxatAgSt5LU_s",
  authDomain: "huong-min-hoho.firebaseapp.com",
  databaseURL: "https://huong-min-hoho-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "huong-min-hoho",
  storageBucket: "huong-min-hoho.appspot.com",
  messagingSenderId: "316009393400",
  appId: "1:316009393400:web:78f2cbbdf6477d8b0b5f0d",
  measurementId: "G-BGSGYFGCHJ"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
require('firebase/app');

// if (window.location.hostname === 'localhost') {
//     auth.useEmulator('http://localhost:9099');
//     db.useEmulator('localhost', '8080');
// }


export {
    auth,
    db
};
export default firebase;
