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
        return (<div key={copy[index].testo} className=''>
        
        <p>{index}</p>
        <p onclick>{copy[index].testo}</p>
    </div>)})}
    

   </div>
  )
}

export default ElementEdit