import { useRef, useState } from "react";
import "./App.css";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import html2canvas from "html2canvas";

import { collection, getDocs, getDoc, doc,setDoc,deleteDoc } from "firebase/firestore";

import ModalUnstyled from "./components/AdminModal";
import { db } from "./components/settings/firebaseconfig";
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





function App() {

  const [elementi, setElementi] = useState(el)
  const [colore,setColore] = useState(colore_barra)
  const [sinistra,setSinistra] = useState(listaSinistra)
  const [destra,setDestra] = useState(listaDestra)
  const imageRef = useRef();
  const [file, setFile] = useState();
  const [elBarra,setElBarra] = useState([])
  
  const editRef = useRef()
  const checkRef = useRef()
  const adminRef =useRef()
  const saveRef =useRef()


  const exportAsImage = async (el, imageFileName,) => {
    checkRef.current.classList.add('invisible')
    editRef.current.classList.add('invisible')
    adminRef.current.classList.add('invisible')  
    saveRef.current.classList.add('invisible')     
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');
  
  
  
    const canvas = await html2canvas(el);
    const image = canvas.toDataURL("image/png", 1.0);
    


    downloadImage(image, imageFileName);
    };

    const downloadImage = (blob, fileName) => {
     
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
          <img style={{width:'78px'}} src={file} alt={'img loaded by user'}/>
          </div>
          <select style={{fontSize:31}} name="TIPO" id="tipo">
            <option>Sistema</option>
            <option> Schema Logico</option>
            <option>Protocollo</option>
            <option>Schema</option>
            <option>Metodo</option>

          </select>
          <div className="flex gap-2 w-full"><p style={{marginTop:'11px'}}>:</p><input style={{fontSize:31}} placeholder="TITOLO" maxLength={24}  type="text" className="p-2 w-full"></input></div>
        </div>
        <div className=" flex justify-center gap-10  my-3  " style={{height:'104px '}}>

          <TextareaAutosize

            className="text-sm p-3 text-red-600 border border-black rounded-sm w-1/2 font-normal h-full resize-none	"
            aria-label="empty textarea"
            placeholder="Descrizione"
            style={{height:'100%',fontSize:18}}
            maxLength={150}
            
          />

          <TextareaAutosize

            className="text-sm h-full p-3 text-green-600 border border-black rounded-sm w-1/2 font-normal resize-none	"
            style={{height:'100%',fontSize:18}}
            maxLength={150}

            aria-label="empty textarea"
            placeholder="Descrizione"

          />
        </div>
        <div className="flex justify-center gap-10  my-3  ">
          <div className="w-1/2 flex flex-wrap border border-black border-sm p-1">

            {sinistra.reverse().map((el) => {
              return (
                <div className="text-sm w-full basis-1/2 " key={el}>
                  <p className="text-left" style={{fontSize:16}}>{el}</p>
                  <TextareaAutosize
                    id={el}
                    // onChange={(e) => isNotEmpty(e.target)}
                    className="text-sm w-full p-1 font-normal resize-none	"
                    style={{height:'127px',fontSize:12}}
                    aria-label="empty textarea"
                    placeholder="..."
                    maxLength={261}
                  />

                </div>
              );
            })}
          </div>
          <div className="w-1/2 flex flex-wrap border border-black border-sm p-2">

            {destra.reverse().map((el) => {
              return (
                <div className="text-sm w-full basis-1/2   " key={el}>
                  <p className="text-left" style={{fontSize:16}}>{el}</p>

                  <TextareaAutosize
                    id={el}
                    className="p-1 text-sm w-full font-normal resize-none	"
                    aria-label="empty textarea"
                    style={{height:'127px',fontSize:12}}

                    placeholder="..."
                    maxLength={261}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div style={{height:'93px'}}>
          <p className="text-left text-sm text-green-600" style={{fontSize:16}}>Trasformazione che cercaaa</p>
          <TextareaAutosize
                    id={el}
                    // onChange={(e) => isNotEmpty(e.target)}
                    className=" text-sm w-full h-full p-3 rounded-sm  font-normal resize-none	"
                    aria-label="empty textarea"
                    placeholder="..."
                    style={{height:'64px',fontSize:12}}
                    maxLength={228}
                  />
        </div>
      </header>

      <div className="w-full">
      <BarraDef checkRef={checkRef} editRef={editRef} changeable={changeable}/>
      </div>
      
      <button ref={saveRef} onClick={()=>exportAsImage(imageRef.current,'test')}>SAVE PICT</button>

      <ModalUnstyled adminRef={adminRef} changeable={changeable} />
    </div>
  );
}

export default App;
