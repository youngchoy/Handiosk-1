import firebase from "firebase/app";
import "firebase/firestore";
// => 원래 Compat안붙이는데 compat이 버전9부터 붙이는걸로 바뀌었다고 하네요

const firebaseConfig = {
	apiKey: "AIzaSyBps1fasOUA7gScVfPTtZVd0vHFlDqyL4U",
	authDomain: "handiosk.firebaseapp.com",
	projectId: "handiosk",
	storageBucket: "handiosk.appspot.com",
	messagingSenderId: "1089752039139",
	appId: "1:1089752039139:web:cdb12f0beb587bc8a2cfd6"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
