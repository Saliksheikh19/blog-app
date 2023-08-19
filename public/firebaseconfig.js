import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth  , createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged ,signOut , EmailAuthProvider , reauthenticateWithCredential ,updatePassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {  getFirestore , doc, setDoc,collection,getDoc,addDoc,getDocs,updateDoc,deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL  }from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js" ;
const firebaseConfig = {
  apiKey: "AIzaSyCe30vzwoE6gZMNq7xsELsay5gdKeVV7q4",
  authDomain: "my-blog-app-d43ad.firebaseapp.com",
  projectId: "my-blog-app-d43ad",
  storageBucket: "my-blog-app-d43ad.appspot.com",
  messagingSenderId: "186479896905",
  appId: "1:186479896905:web:780dd18e1e1b0253641298"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export{
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getFirestore ,
   doc, 
   setDoc,
   collection,
   getDoc,addDoc,
   getDocs,
   updateDoc,
   deleteDoc,
   db,
    uploadBytesResumable,
     getDownloadURL ,
     onAuthStateChanged  ,
     signOut ,
     ref,
     storage,
     EmailAuthProvider , reauthenticateWithCredential ,updatePassword 
 
}


// const q = query(citiesRef, where("regions", "array-contains", "west_coast"));