// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
//@ts-ignore
import { firebaseConfig } from "@/../firebaseConfig";
import * as firebase from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

let firebaseApp = firebase.initializeApp(firebaseConfig);
// https://stackoverflow.com/questions/69240255/uncaught-typeerror-firebaseapp-firestore-is-not-a-function-when-integrating-f
// console.log(firebaseApp);
let firestore = getFirestore(firebaseApp);
// let firestorage = firebase.storage().ref();
let firestorage = getStorage(firebaseApp);
// let fireAuth = getAuth();

// console.log(firestore);
export { firebaseApp, firestore, firestorage };
