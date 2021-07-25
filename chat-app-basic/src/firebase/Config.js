import firebase from 'firebase'
import 'firebase/firebase-analytics'
import 'firebase/firebase-auth'
import 'firebase/firestore'

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
