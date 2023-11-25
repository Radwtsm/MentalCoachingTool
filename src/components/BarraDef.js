import React, { useRef, useState } from 'react'
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';


const BarraDef = ({colore,changeable,editRef,checkRef}) => {
    const [elementi,setElementi] = useState([{
        id:1,
        testo:'Funzioni e regole dei soldi',
        simbolo:'F',
    },{
        id:2,
        testo:'Organizzazione e gestione',
        simbolo:'O',
    },{
        id:3,
        testo:'Riprogrammare la tua mente',
        simbolo:'R',
    },{
        id:3,
        testo:'Zaino strumenti',
        simbolo:'Z',
    },{
        id:4,
        testo:'Avviare la tua rinascita',
        simbolo:'A',

    },{
        id:5,
        testo:'6 utility da avere',
        simbolo:'6',
    }])

    const [testo,setTesto] = useState('')
    const [simbolo,setSimbolo] = useState('')
    const [next,setNext] = useState([])
    const [isEditable,setIsEditable] = useState(false)

    const myRef = useRef();

    function onTestoChange(e){
        setTesto(e.target.value)
    }
    
    function onSimboloChange(e){
        setSimbolo(e.target.value)
    }

    function onTextChange(e) {
        let length =  e.target.value.length

        if (length > 0) {
            console.log('aggiunto',e.target.id)
            if (!next.includes(e.target.id)) {
                setNext([...next,e.target.id])
            }
            
        } else if (length === 0) {
            console.log('rimosso',e.target.id)
            let new_arr = next.filter((el)=> el !== e.target.id)
            setNext(new_arr)
        }
        console.log(next)
    }

    function check() {
        let filtered = elementi.filter((el)=> next.includes(el.testo))
        setElementi(filtered)
    }

    function hexToRgba(hexColor) {
        // console.log(hexColor)
        if (!hexColor.startsWith('#')) {
          throw new Error('Hex color code must start with #');
        }
      
        // hexColor = hexColor.trimStart('#');
        hexColor = hexColor.replace('#','')
        if (hexColor.length !== 6) {
          throw new Error('Hex color code must be 6 characters long');
        }
      
        const r = parseInt(hexColor.slice(0, 2), 16);
        const g = parseInt(hexColor.slice(2, 4), 16);
        const b = parseInt(hexColor.slice(4, 6), 16);
        // console.log(`rgba(${r}, ${g}, ${b}, 1)`)
        return `rgba(${r}, ${g}, ${b}, 1)`;
      }

    function reset(){
        setTesto('')
        setSimbolo('')
    }

    function onAdd(){
        let new_arr = elementi
        new_arr.push({
            id:elementi.length,
            simbolo,
            testo,
        })
        console.log({
            id:elementi.length,
            simbolo,
            testo,
        })
        setElementi(new_arr)
        reset()
    }

    function onClear() {
        setElementi([])
    }

    function onDelete(del_id){
        // console.log(index)
        let new_arr = elementi
        
        setElementi(new_arr.filter(({id})=> id !== del_id ))
        reset()
    }

    function toggleEdit(){
        setIsEditable(!isEditable)
    }

  return (
    <div className='w-full'>


        {isEditable && (<div className='border'>
        <div className=''>
            <p>lista elementi</p>
            {elementi.map(({testo,simbolo,id},index)=>{
                return (
                    <div key={testo} className='flex gap-3'>
                        <p>{index}</p>
                        <p>{testo}</p>
                        <p>{simbolo}</p>
                        <p className='text-red-500' onClick={()=>onDelete(id)}>X</p>
                    </div>
                )
            })
            }

        </div>
        <div className='border'>
        <input type="text" value={simbolo} placeholder='simbolo' onChange={(e)=>onSimboloChange(e)}/>
        <input type="text" value={testo}   placeholder='testo' onChange={(e)=>onTestoChange(e)}/>
        <button className='mx-2 text-red-500' onClick={()=>onAdd()}>ADD</button>
        <button className='mx-2 text-green-500' onClick={()=>onClear()}>RESET</button>
    </div>
        </div>)}

            <div className=' my-12'>
            <Button ref={editRef} onClick={()=>toggleEdit()} className='' variant="outlined">Edit</Button>

            </div>
    
    <div className='flex justify-center items-center flex-col'>
    <div className='flex w-full justify-center'>
    <div className='flex justify-center mb-5 '><p className='bg-black shadow-lg  w-min rounded-full text-white' style={{width:'40px',height:'40px'}}>A</p></div>

    <div className=" h-9 rounded-md flex justify-around items-around  w-full hexagon font-black" style={{backgroundColor:colore,background:'rgb(2,0,36)',background:`linear-gradient(90deg, rgba(2,0,36,1) 0%, ${hexToRgba(changeable.colore)}`,marginLeft:'1rem',marginRight:'1rem'}} ref={myRef}>
   
{elementi.map(({simbolo,testo,id})=>{
        return(
            <div key={testo} className='overflow-visible w-30'>
                <div className='flex justify-center mb-5 '><div className='bg-black shadow-lg  w-min rounded-full text-white' style={{width:'40px',height:'40px'}}><p>{simbolo}</p></div></div>
                <div style={{width:'160px',height:'300px'}} className='border border-black border-sm mx-2    h-60 '>
                <h2 className='text-sm text-white rounded-md h-20 text-center flex justify-center items-center  mx-2 mt-2 font-medium' style={{backgroundColor:changeable.colore,fontSize:14}}><p className=''>{testo}</p></h2>
                <TextareaAutosize
                    id={testo}
                    
                    // onChange={(e) => isNotEmpty(e.target)}
                    className="text-sm w-full font-medium resize-none "
                    aria-label="empty textarea"
                    placeholder="..."
                    maxLength={100}
                    onChange={(e)=>onTextChange(e)}
                    style={{height:'200px',width:'150px'}}
                  />
                  </div>
            </div>
        )
    })}
    </div>
<div className='flex justify-center'><p className='bg-black shadow-lg  w-min rounded-full text-white' style={{width:'40px',height:'40px'}}>B</p></div>

    </div>

    <button ref={checkRef} className='mt-80 text-green-500' onClick={()=>check()}>check</button>
</div>
    </div>
    
  )
}

export default BarraDef