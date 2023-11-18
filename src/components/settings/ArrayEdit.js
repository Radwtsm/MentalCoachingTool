import React, { useState } from 'react'

const ArrayEdit = ({ changeable }) => {
    console.log('sinistra', changeable.sinistra)
    console.log('destra', changeable.destra)
    //doc.nome arr[]

    function onInputChange(e,direzione) {
        if (direzione==='sinistra') {
            setNewSinistra(e.target.value)
        } else {
            setNewDestra(e.target.value)

        }
    }

    async function addElement(direzione,testo) {
        console.log('aggiungere',testo,direzione)

        changeable.addLista(direzione,testo)
    }

    function removeElement(direzione,testo) {
        console.log('rimuovere',testo,direzione)

        changeable.removeLista(direzione,testo)
    }

    const [newDestra, setNewDestra] = useState('')
    const [newSinistra, setNewSinistra] = useState('')

    return (
        <div className='flex '>
            <div className='flex gap-3'>
            <div className='flex flex-col'>
                <p className='font-bold'>LISTA SINISTRA</p>
                {changeable.sinistra.map((el) => <div className='flex gap-2' key={el}>{el}<button onClick={()=>removeElement('sinistra',el)} className='text-red-500'>x</button></div>)}
                <div className="flex">
                <input className='border p-2' type="text" name="" id="" value={newSinistra} onChange={(e)=>onInputChange(e,'sinistra')} />
                <button className='text-green-500' onClick={()=>addElement('sinistra',newSinistra)}>+</button>
                </div>
            </div>
            <div className='flex flex-col'> <p className='font-bold'>LISTA DESTRA</p>{changeable.destra.map((el) => <div className='flex gap-2' key={el}>{el}<button onClick={()=>removeElement('destra',el)} className='text-red-500'>x</button></div>)}
            <div className='flex'>
            <input className='border p-2' type="text" name="" id="" value={newDestra} onChange={(e)=>onInputChange(e,'destra')}/>
            <button className='text-green-500' onClick={()=>addElement('destra',newDestra)}>+</button>            </div>
            </div>
            
            
      
           
            
            </div>


        </div>
    )
}

export default ArrayEdit