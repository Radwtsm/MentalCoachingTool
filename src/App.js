import { useState } from "react";
import "./App.css";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
// Import the functions you need from the SDKs you need


//firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import Barra from "./components/Barra";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_Zxf0Q1ukvqWRipj_KUY7tzfJPVjfPPA",
  authDomain: "mentalcoaching2.firebaseapp.com",
  projectId: "mentalcoaching2",
  storageBucket: "mentalcoaching2.appspot.com",
  messagingSenderId: "29589921411",
  appId: "1:29589921411:web:916f98b6df9c99cdaec5b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

let listaSinistra = []
let listaDestra = []
let el = []

const querySinistra = await getDocs(collection(db, "lista_sinistra"));
querySinistra.forEach((doc) => {
  listaSinistra.push(doc.data().nome)
});

const queryDestra = await getDocs(collection(db, "lista_destra"));
queryDestra.forEach((doc) => {
  listaDestra.push(doc.data().nome)
});

//elementi barra
const queryElementiBarra = await getDocs(collection(db, "elementi_barra"));
queryElementiBarra.forEach((doc, i) => {

  el.push({

    simbolo: doc.data().simbolo,
    testo: doc.data().testo
  })
});
console.log(el)



//colori
const docRef = doc(db, "colori", "barra");
const docSnap = await getDoc(docRef);

const colore_barra = docSnap.data().colore




function App() {

  const [elementi, setElementi] = useState(el)
  console.log('eccolooo', colore_barra)
  // const lista_elementi1 = [
  //   "paure",
  //   "frustrazioni",
  //   "ansie",
  //   "esigenze/punti di dolore",
  //   "dubbi/obiezioni",
  //   "emozioni che prova ora",
  // ];

  // opzioni della tabella di destra, può esser modificata per cambiare i campi disponibili
  // const lista_elementi2 = [
  //   "desideri",
  //   "ambizioni",
  //   "perchè",
  //   "benefici che desidera",
  //   "risoluzione dubbi/obiezioni",
  //   "emozioni che vuole provare",
  // ];

  // const [selezionati, setSelezionati] = useState([]);

  // const isNotEmpty = (element) => {
  //   console.log(element.id);
  //   console.log(element.value.length);

  //   //campo compilato
  //   if (element.value.length > 0) {
  //     //se NON è gia presente nei selezionati
  //     if (!selezionati.includes(element.id)) {
  //       // setSelezionati([...selezionati,element.value.id])
  //       let new_arr = selezionati;
  //       new_arr.push(element.id);
  //       setSelezionati(new_arr);
  //       console.log("aggiunto", element.id);
  //     }
  //   } else if (element.value.length === 0) {
  //     // let new_array = selezionati.filter((el)=> el !== element.value)
  //     let new_arr = selezionati.filter((el) => el !== element.id);
  //     setSelezionati(new_arr);

  //     console.log("rimosso");
  //     // setSelezionati(new_array)
  //   }
  // };

  return (
    <div className="App text-black App-header border border-black rounded-sm">
      <header className="border border-black rounded-sm p-3 my-10 w-4/5 ">
        <span className="flex gap-2">
          <select name="TIPO" id="tipo">
            <option>Sistema</option>
            <option> Schema Logico</option>
            <option>Protocollo</option>
            <option>Schema</option>
            <option>Metodo</option>

          </select>
          <span className="flex gap-2"><p>:</p><p className="text-green-600">Forza 6</p></span>
        </span>
        <div className="flex gap-2">

        <TextareaAutosize

className="text-sm h-full p-3 text-red-600 border border-black rounded-sm w-1/2"
aria-label="empty textarea"
placeholder="Descrizione"

/>

<TextareaAutosize

className="text-sm h-full p-3 text-red-600 border border-black rounded-sm w-1/2"
aria-label="empty textarea"
placeholder="Descrizione"

/>
        </div>
        <div className="flex justify-center gap-10 border border-black border-sm my-3 p-2">
          <div className="w-1/2">

            {listaSinistra.map((el) => {
              return (
                <div className="w-full" key={el}>
                  <p>{el}</p>
                  <TextareaAutosize
                    id={el}
                    // onChange={(e) => isNotEmpty(e.target)}
                    className="text-sm w-full"
                    aria-label="empty textarea"
                    placeholder="Empty"
                    maxLength={400}
                  />

                </div>
              );
            })}
          </div>
          <div className="w-1/2">

            {listaDestra.map((el) => {
              return (
                <div className="w-full" key={el}>
                  <p>{el}</p>

                  <TextareaAutosize
                    id={el}
                    // onChange={(e) => isNotEmpty(e.target)}
                    className="text-sm w-full"
                    aria-label="empty textarea"
                    placeholder="Empty"
                    maxLength={400}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </header>

      <Barra colore={colore_barra} el={elementi} set={setElementi} />
    </div>
  );
}

export default App;
