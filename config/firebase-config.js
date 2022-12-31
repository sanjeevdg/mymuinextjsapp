import firebase,{initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB9lmMe0fmVB51eVrbHhI6bK9pEk4K7Gy4",
    authDomain: "btauth-94c78.firebaseapp.com",
    projectId: "btauth-94c78",
    storageBucket: "btauth-94c78.appspot.com",
    messagingSenderId: "534967778139",
    appId: "1:534967778139:android:19dfd99d14aa7e048cb87e",
    measurementId: ""
};

const app = initializeApp(firebaseConfig);
var auth = getAuth(app);
var db = getFirestore(app);
export {auth,db};
