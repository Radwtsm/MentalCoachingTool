import React, { useState } from 'react'

const EditBarraEl = ({changeable}) => {
    

    const [simbolo,setSimbolo] = useState('')
    const [testo,setTesto] = useState('')

    function onChangeSimbolo(e){
            setSimbolo(e.target.value)
        }

        function onChangeTesto(e){
            setTesto(e.target.value)
        }

    function onAdd() {
        console.log(simbolo,testo)
        
        changeable.setElBarra([...changeable.elBarra,{simbolo,testo}])
        console.log(changeable.elBarra)
        setSimbolo('')
        setTesto('')
    }

    function onDelete(index){
        let arr = changeable.elBarra
        arr.splice(index,1)
        changeable.setElBarra(arr)
        setSimbolo('')
        setTesto('')
        console.log(changeable.elBarra)
        

        // changeable.setElBarra()
    }
  return (<div>
<p>lista el</p>
{changeable.elBarra.map(({testo,simbolo},index)=><div key={index}>
    <span className='flex gap-3'>
    <p>{index}</p>
    <p>{simbolo}</p>
    <p>{testo}</p>
    <p onClick={()=>onDelete(index)} className='text-red-500'>X</p>
    </span>
    
</div>)}
<div className='border flex'>
        


        <input type="text" name="" id="simbolo" onChange={(e)=>onChangeSimbolo(e)} placeholder='simbolo' value={simbolo} />
        <input type="text" name="" id="testo"   onChange={(e)=>onChangeTesto(e)} placeholder='testo' value={testo} />
        <button onClick={()=>onAdd()}>+</button>
    </div>
  </div>
    
  )
}

export default EditBarraEl