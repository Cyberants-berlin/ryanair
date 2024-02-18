//  Import  the  functions  you  need  from  the  SDKs  you  need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//  TODO:  Add  SDKs  for  Firebase  products  that  you  want  to  use
//  https://firebase.google.com/docs/web/setup#available-libraries

//  Your  web  app's  Firebase  configuration
//  For  Firebase  JS  SDK  v7.20.0  and  later,  measurementId  is  optional
const  firebaseConfig  =  {
    apiKey:  "AIzaSyCFm7uYs6DMHFWi3en4_m2Jiio5194eS7w",
    authDomain:  "ryanair-4cd15.firebaseapp.com",
    databaseURL:  "https://ryanair-4cd15-default-rtdb.europe-west1.firebasedatabase.app",
    projectId:  "ryanair-4cd15",
    storageBucket:  "ryanair-4cd15.appspot.com",
    messagingSenderId:  "937464188569",
    appId:  "1:937464188569:web:360934dc26bff912d57208",
    measurementId:  "G-KPYQGYGSZS"
};

//  Initialize  Firebase  and  return  db  =  firebase.firestore();
const  app  =  initializeApp(firebaseConfig);
export const auth = getAuth(app);