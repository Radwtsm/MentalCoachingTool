import { useRef, useState } from "react";
import "./App.css";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import html2canvas from "html2canvas";
import EditBarraEl from "./components/EditBarraEl";

// import { useScreenshot } from 'use-react-screenshot'
// Import the functions you need from imthe SDKs you need


//firebase
// Import the functions you need from the SDKs you need

import { collection, getDocs, getDoc, doc,setDoc,deleteDoc } from "firebase/firestore";
import Barra from "./components/Barra";
import ModalUnstyled from "./components/AdminModal";
import { db } from "./components/settings/firebaseconfig";
import { style } from "@mui/system";
import CustomizedSteppers from "./components/Stepper";
import BarraDef from "./components/BarraDef";

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
// console.log(el)

// const settings = {
//   utils: {
//     changeColor: function (colorString) {

//     },
//     getColor: async function () {
//       const docRef = doc(db, "colori", "barra");
//       const docSnap = await getDoc(docRef);
//       // const colore_barra = docSnap.data().colore

//       return docSnap;
//     },
//     setColor: async function (stringColor) {
//       const colorRef = db.collection('colori').doc('barra');

//       // Set the 'capital' field of the city
//       const res = await colorRef.update({ colore: stringColor });
//       updateDoc(colorRef)
//       return res
//     }
//   }
// }


//colori
const docRef = doc(db, "colori", "barra");
const docSnap = await getDoc(docRef);

const colore_barra = docSnap.data().colore

const exportAsImage = async (el, imageFileName,) => {
  const style = document.createElement('style');
  document.head.appendChild(style);
  style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');



  const canvas = await html2canvas(el);
  const image = canvas.toDataURL("image/png", 1.0);
  downloadImage(image, imageFileName);
  };const downloadImage = (blob, fileName) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.style = "display:none;";
  fakeLink.download = fileName;
  
  fakeLink.href = blob;
  
  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);
  
  fakeLink.remove();
  // style.remove()
  };


function App() {

  const [elementi, setElementi] = useState(el)
  const [colore,setColore] = useState(colore_barra)
  const [sinistra,setSinistra] = useState(listaSinistra)
  const [destra,setDestra] = useState(listaDestra)
  const imageRef = useRef();
  const [file, setFile] = useState();
  const [elBarra,setElBarra] = useState([

  ])

  // console.log(el)
  // console.log('eccolooo', colore_barra)
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

  async function addLista(direzione,testo){
    const lista_dir = direzione === 'sinistra' ? 'lista_sinistra' : 'lista_destra'
    // Add a new document in collection "cities"
await setDoc(doc(db, lista_dir, testo), {
  nome: testo
});

if (direzione==='sinistra') {
  let new_arr = []
  let querySinistra = await getDocs(collection(db, "lista_sinistra"));
  querySinistra.forEach((doc) => new_arr.push(doc.data().nome))
  setSinistra(new_arr)
} else {
  let new_arr = []
  let queryDestra = await getDocs(collection(db, "lista_destra"))
  queryDestra.forEach((doc) => new_arr.push(doc.data().nome))
  setDestra(new_arr)
}

  }

  async function removeLista(direzione,testo) {
    const lista = direzione === 'sinistra' ? 'lista_sinistra' : 'lista_destra'
    await deleteDoc(doc(db, lista, testo));

    if (direzione==='sinistra') {
      let new_arr = []
      let querySinistra = await getDocs(collection(db, "lista_sinistra"));
      querySinistra.forEach((doc) => new_arr.push(doc.data().nome))
      setSinistra(new_arr)
    } else {
      let new_arr = []
      let queryDestra = await getDocs(collection(db, "lista_destra"))
      queryDestra.forEach((doc) => new_arr.push(doc.data().nome))
      setDestra(new_arr)
    }
  }

  async function getListaElementi(){
    let new_arr = []
    let queryElementi = await getDocs(collection(db, "lista_elementi"));
    queryElementi.forEach((doc) => new_arr.push(doc.data()))
    setElementi(new_arr)
  }

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}


  const changeable = {
    colore:colore_barra,
    setColore:setColore,
    sinistra:sinistra,
    destra:destra,
    addLista:addLista,
    removeLista,
    elementi:elementi,
    screen:exportAsImage,
    ref:imageRef,
    elBarra,
    setElBarra,
  }

  return (
    <div className="App text-black App-header border border-black rounded-sm font-bold mt-3" ref={imageRef} >
      
      <header className=" p-3  w-full mx-20 ">
        <div className="flex gap-2 items-center">
          <div>
          {!file && <input className="text-sm" type="file" onChange={handleChange} />}
      <img style={{width:'78px'}} src={file} />
          </div>
          <select name="TIPO" id="tipo">
            <option>Sistema</option>
            <option> Schema Logico</option>
            <option>Protocollo</option>
            <option>Schema</option>
            <option>Metodo</option>

          </select>
          <div className="flex gap-2 w-full"><p>:</p><input placeholder="TITOLO" maxLength={24}  type="text" className="p-2 w-full"></input></div>
        </div>
        <div className=" flex justify-center gap-10  my-3  " style={{height:'104px '}}>

          <TextareaAutosize

            className="text-sm p-3 text-red-600 border border-black rounded-sm w-1/2 font-normal h-full resize-none	"
            aria-label="empty textarea"
            placeholder="Descrizione"
            style={{height:'100%'}}
            maxLength={233}
            
          />

          <TextareaAutosize

            className="text-sm h-full p-3 text-green-600 border border-black rounded-sm w-1/2 font-normal resize-none	"
            style={{height:'100%'}}
            maxLength={233}

            aria-label="empty textarea"
            placeholder="Descrizione"

          />
        </div>
        <div className="flex justify-center gap-10  my-3  ">
          <div className="w-1/2 flex flex-wrap border border-black border-sm p-1">

            {sinistra.reverse().map((el) => {
              return (
                <div className="text-sm w-full basis-1/2 " key={el}>
                  <p className="text-left">{el}</p>
                  <TextareaAutosize
                    id={el}
                    // onChange={(e) => isNotEmpty(e.target)}
                    className="text-sm w-full p-1 font-normal resize-none	"
                    style={{height:'127px'}}
                    aria-label="empty textarea"
                    placeholder="..."
                    maxLength={174}
                  />

                </div>
              );
            })}
          </div>
          <div className="w-1/2 flex flex-wrap border border-black border-sm p-2">

            {destra.reverse().map((el) => {
              return (
                <div className="text-sm w-full basis-1/2   " key={el}>
                  <p className="text-left">{el}</p>

                  <TextareaAutosize
                    id={el}
                    // onChange={(e) => isNotEmpty(e.target)}
                    className="p-1 text-sm w-full font-normal resize-none	"
                    aria-label="empty textarea"
                    style={{height:'127px'}}

                    placeholder="..."
                    maxLength={174}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div style={{height:'93px'}}>
          <p className="text-left text-sm text-green-600">Trasformazione che cerca</p>
          <TextareaAutosize
                    id={el}
                    // onChange={(e) => isNotEmpty(e.target)}
                    className=" text-sm w-full font-normal
                    
                     h-full p-3   rounded-sm  font-normal resize-none	"
                    aria-label="empty textarea"
                    placeholder="..."
                    style={{height:'64px'}}
                    maxLength={228}
                  />
        </div>
      </header>

      {/* <EditBarraEl changeable={changeable}/> */}
      {/* <Barra changeable={changeable} colore={colore} el={elementi} set={setElementi} /> */}
      <div >
      <BarraDef changeable={changeable}/>
      </div>
      
      <button onClick={()=>exportAsImage(imageRef.current,'test')}>SAVE PICT</button>

      {/* <CustomizedSteppers changeable={changeable}/> */}
      <ModalUnstyled changeable={changeable} />
    </div>
  );
}

export default App;
