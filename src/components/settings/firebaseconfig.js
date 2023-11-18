
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getDoc,doc,updateDoc } from "firebase/firestore";
export const firebaseConfig = {
    apiKey: "AIzaSyA_Zxf0Q1ukvqWRipj_KUY7tzfJPVjfPPA",
    authDomain: "mentalcoaching2.firebaseapp.com",
    projectId: "mentalcoaching2",
    storageBucket: "mentalcoaching2.appspot.com",
    messagingSenderId: "29589921411",
    appId: "1:29589921411:web:916f98b6df9c99cdaec5b6"
  };


export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


export const settings = {
    utils: {
      changeColor: function (colorString) {
  
      },
      getColor: async function () {
        const docRef = doc(db, "colori", "barra");
        const docSnap = await getDoc(docRef);
        // const colore_barra = docSnap.data().colore
  
        return docSnap;
      },
      setColor: async function (stringColor) {
        let colorRef = doc(db, "colori", "barra");
        await updateDoc(colorRef, {
            colore: stringColor
          });
        // Set the 'capital' field of the city
        // const res = await docRef.update({ colore: stringColor });
        // updateDoc(docRef)
        
      }
    }
  }
