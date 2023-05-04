// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
//@ts-ignore
import { firebaseConfig } from "@/../firebaseConfig";
import * as firebase from "@firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

let firebaseApp = firebase.initializeApp(firebaseConfig);

// Ts에서 undefined로 설정된 값은 firebase에서는 에러가 발생함
// 따라서 ignoerUndefinedProperties 값을 True로 넣으면 firestore에서 알아서 무시함
initializeFirestore(firebaseApp, {
  ignoreUndefinedProperties: true,
});
// https://stackoverflow.com/questions/69240255/uncaught-typeerror-firebaseapp-firestore-is-not-a-function-when-integrating-f
let firestore = getFirestore(firebaseApp);
// let firestorage = firebase.storage().ref();
let firestorage = getStorage(firebaseApp);
// let fireAuth = getAuth();

export { firebaseApp, firestore, firestorage };
