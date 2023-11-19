import React, { useState } from 'react'
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useRef } from 'react';




const Barra = (props) => {
    const myRef = useRef(null);
    const [next,setNext] = useState([])
    props.el.forEach((el,index)=>console.log(el,index))


    function onChange(e) {
        let length =  e.target.value.length

        if (length > 0) {
            console.log('aggiunto',e.target.id)
            if (!next.includes(e.target.id)) {
                setNext([...next,e.target.id])
            }
            
        } else if (length === 0) {
            console.log('rimosso',e.target.id)
            let new_arr = next.filter((el)=> el != e.target.id)
            setNext(new_arr)
        }
    }
    
   function check(){
    // console.log(props.set)
    console.log('next',next)
    console.log('el',props.el)

    let filtered = props.el.filter((el)=> next.includes(el.testo))
    props.set(filtered)
    // props.changeable.screen(props.changeable.ref,'test')
    // console.log(filtered)
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

  return (
    <div className='flex justify-center items-center flex-col'>
    <div className='flex'>
    <div className='flex justify-center mb-5 '><p className='bg-black shadow-lg shadow-white w-min rounded-full text-white' style={{width:'40px',height:'40px'}}>A</p></div>

    <div className=" h-9 rounded-md flex justify-around items-around  w-10/12" style={{backgroundColor:props.colore,background:'rgb(2,0,36)',background:`linear-gradient(90deg, rgba(2,0,36,1) 0%, ${hexToRgba(props.colore)}`,marginLeft:'1rem',marginRight:'1rem'}} ref={myRef}>
    {props.el.map(({simbolo,testo})=>{
        return(
            <div key={testo} className='overflow-visible w-30'>
                <div className='flex justify-center mb-5 '><p className='bg-black shadow-lg shadow-white w-min rounded-full text-white' style={{width:'40px',height:'40px'}}>{simbolo}</p></div>
                <div className='border border-black border-sm mx-2 p-2   h-60 '>
                <h2 className='text-sm text-white rounded-md h-20 text-center flex justify-center items-center' style={{backgroundColor:props.colore}}><p>{testo}</p></h2>
                <TextareaAutosize
                    id={testo}
                    // onChange={(e) => isNotEmpty(e.target)}
                    className="text-sm w-full font-medium"
                    aria-label="empty textarea"
                    placeholder="..."
                    maxLength={142}
                    onChange={(e)=>onChange(e)}
                    style={{height:'140px'}}
                  />
                  </div>
            </div>
        )
    })}
</div>
<div className='flex justify-center mb-5 '><p className='bg-black shadow-lg shadow-white w-min rounded-full text-white' style={{width:'40px',height:'40px'}}>B</p></div>

    </div>

<button className='mt-80 text-green-500' onClick={()=>check()}>check</button>
</div>
  )
}

export default Barra