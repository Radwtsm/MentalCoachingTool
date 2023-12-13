import { useRef, useState } from "react";
import "./App.css";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import html2canvas from "html2canvas";

import { collection, getDocs, getDoc, doc,setDoc,deleteDoc } from "firebase/firestore";

import ModalUnstyled from "./components/AdminModal";
import { db } from "./components/settings/firebaseconfig";
import BarraDef from "./components/BarraDef";
import AlignedTable from "./components/AlignedTable/AlignedTable";
import userEvent from "@testing-library/user-event";


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
  const [titolo,setTitolo] = useState('')
  
  const editRef = useRef()
  const checkRef = useRef()
  const adminRef =useRef()
  const saveRef =useRef()
  const selectRef = useRef()
  const renSelectRef = useRef()


  // function changeSelect(){
  //   let value = selectRef.current.value 


  //   // console.log(selectRef.current.value)
  //   // console.log(value)
  //   setTitolo(value)
  //   selectRef.current.classList.add = 'hidden'
  //   renSelectRef.current.classList.remove('hidden')

  // }

  // function revertChangeSelected(){
  //   selectRef.current.classList.remove('hidden')
  //   renSelectRef.current.classList.add('hidden')
  // }

  const toggleInput = () => {
      if (selectRef.current.classList.contains('hidden')) {
        selectRef.current.classList.remove('hidden')
      } else {
        selectRef.current.classList.add('hidden')
      }
      
      if (renSelectRef.current.classList.contains('hidden')) {
        renSelectRef.current.classList.remove('hidden')
      } else {
        renSelectRef.current.classList.add('hidden')
      }
    
  }

  const exportAsImage = async (el, imageFileName,) => {

    // changeSelect()

    checkRef.current.classList.add('invisible')
    editRef.current.classList.add('invisible')
    adminRef.current.classList.add('invisible')  
    saveRef.current.classList.add('invisible')     
    const style = document.createElement('style');

    document.head.appendChild(style);
    style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');
  
  
  
    const canvas = await html2canvas(el,{scrollY: window.scrollY});
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

  checkRef.current.classList.remove('invisible')
    editRef.current.classList.remove('invisible')
    adminRef.current.classList.remove('invisible')  
    saveRef.current.classList.remove('invisible')     
      // revertChangeSelected()
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
    colore:colore,
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

  // console.log(sinistra.slice(0, sinistra.length).chunk(2).map((pair, index)=>console.log(pair,index)))
  console.log(sinistra.reverse(),destra.reverse())

  return (
    <div className="App text-black App-header border border-black rounded-sm font-bold mt-3" ref={imageRef} >
      
      <header className=" p-3  w-full mx-20 ">
        <div className="flex gap-2 items-center">
          <div>
          {!file && <input className="text-sm" type="file" onChange={handleChange} />}
          <img style={{width:'78px'}} src={file} alt={'img loaded by user'}/>
          </div>
          <div ref={renSelectRef}  className="hidden" style={{wordWrap:'unset'}} contentEditable>{titolo}</div>
          <select onChange={(e)=>setTitolo(e.target.value)} ref={selectRef} style={{fontSize:31}} name="TIPO" id="tipo">
            <option>Sistema</option>
            <option> Schema Logico</option>
            <option>Protocollo</option>
            <option>Schema</option>
            <option>Metodo</option>

          </select>
          <div className="flex gap-2 w-full"><p style={{marginTop:'11px'}}>:</p><div contentEditable 
          onKeyDown={(e)=>{
              if (e.currentTarget.innerHTML.length > 24 && e.key !== 'Backspace'){
                e.preventDefault()
              }
            }}  
             style={{fontSize:31}} placeholder="TITOLO" maxLength={24}  type="text" className="p-2 w-full text-left"></div></div>
        </div>
        
        
        
        <div>
        <div className=" flex justify-center gap-10  my-3  p-3" style={{}}>

<div
    contentEditable
    className="text-sm text-left p-3 text-red-600 border border-black rounded-sm font-normal h-full resize-none	"
    aria-label="empty textarea"
    placeholder="Descrizione"
    style={{height:'auto',fontSize:18,minWidth:'50%',maxWidth:'50%'}}
    // maxLength={300}
    // onKeyDown={(e)=>{
    //   if (e.currentTarget.innerHTML.length > 160 && e.key !== 'Backspace'){
    //     e.preventDefault()
    //   }
    // }}  
  />

<div
    contentEditable
    className="text-sm p-3 text-left text-green-600 border border-black rounded-sm font-normal h-full resize-none	"
    aria-label="empty textarea"
    placeholder="Descrizione"
    style={{height:'auto',fontSize:18,minWidth:'50%',maxWidth:'50%'}}
    // maxLength={300}
    // onKeyDown={(e)=>{
    //   if (e.currentTarget.innerHTML.length > 160 && e.key !== 'Backspace'){
    //     e.preventDefault()
    //   }
    // }}  
  />
</div>
{/* <div className="flex justify-center gap-10  my-3  ">
  <div className="w-1/2 flex flex-wrap border border-black border-sm p-1">

    {sinistra.reverse().map((el) => {
      return (
        <div className="text-sm w-full basis-1/2 " key={el}>
          <p className="text-left" style={{fontSize:16}}>{el}</p>
          <div
            contentEditable
            id={el}
            // onChange={(e) => isNotEmpty(e.target)}
            className="text-left text-black text-sm w-full p-1 font-normal resize-none	"
            style={{fontSize:12,width:'300px'}}
            aria-label="empty textarea"
            placeholder="..."
            maxLength={261}
            onKeyDown={(e)=>{
              if (e.currentTarget.innerHTML.length > 261 && e.key !== 'Backspace'){
                e.preventDefault()
              }
            }}  
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

          <div
            contentEditable
            id={el}
            // onChange={(e) => isNotEmpty(e.target)}
            className="text-left text-black text-sm w-full p-1 font-normal resize-none	"
            style={{height:'127px',fontSize:12,width:'300px'}}
            aria-label="empty textarea"
            placeholder="..."
            maxLength={261}
            onKeyDown={(e)=>{
              if (e.currentTarget.innerHTML.length > 261 && e.key !== 'Backspace'){
                e.preventDefault()
              }
            }}  
          />
        </div>
      );
    })}
  </div>
</div> */}
{/* //ciao */}

  {/* inizio */}
  <AlignedTable/>
{/* fine */}
        </div>
        


        <div style={{height:'93px'}}>
          <p className="text-left text-sm text-green-600" style={{fontSize:16}}>Trasformazione che cerca</p>
          <div
          contentEditable
                    id={el}
                    // onChange={(e) => isNotEmpty(e.target)}
                    className="text-left text-sm w-full h-full p-3 rounded-sm  font-normal resize-none	"
                    aria-label="empty textarea"
                    placeholder="..."
                    style={{height:'auto',fontSize:12}}
                    maxLength={228}
                    // onKeyDown={(e)=>{
                    //   if (e.currentTarget.innerHTML.length > 400 && e.key !== 'Backspace'){
                    //     e.preventDefault()
                    //   }
                    // }}  
                  />
        </div>
      </header>

      <div className="w-full">
      <BarraDef checkRef={checkRef} editRef={editRef} changeable={changeable}/>
      </div>
      
      <button className="" ref={saveRef} onClick={()=>{
        
        // selectRef.current.classList.add('hidden')
        // renSelectRef.current.classList.remove('hidden')
        toggleInput()
        exportAsImage(imageRef.current,'test')
        toggleInput()

    
      }
        
        }>SAVE PICT</button>

      <ModalUnstyled adminRef={adminRef} changeable={changeable} />
    </div>
  );
}

export default App;
