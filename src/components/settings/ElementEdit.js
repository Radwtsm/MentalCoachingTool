import React, { useState } from 'react'

const ElementEdit = ({changeable}) => {
    
    function onChange(e,index){
        
        copy[index].testo = e.target.value
        console.log(copy[index].testo,e.target.value)
        setEl(copy)
    }
    const [el,setEl] = useState(changeable.elementi)
    let copy = el
    console.log('el',el)
  return (
   <div>
    <p>LISTA ELEMENTI</p>
    {el.map((ele,index)=>{
        let value = el.testo
        return (<div>
        
        <p>{index}</p>
        <input onChange={(e)=>onChange(e,index)} key={ele.testo} value={copy[index].testo}/>
    </div>)})}


   </div>
  )
}

export default ElementEdit