import React from 'react'
import Campo from './Campo'

const AlignedTable = () => {
  return (
    <div className=' border border-black w-full p-3'>

        <div className='flex'>
        
        <Campo etichetta={'Paure'}/>     
        <Campo etichetta={'Frustrazioni'}/>
        <div className='mx-20'></div>
        <Campo etichetta={'Desideri'}/>
        <Campo etichetta={'Ambizioni'}/>
        </div>

        <div className='flex'>
        <Campo etichetta={'Ansie'}/>     
        <Campo etichetta={'Esigenze/punti di dolore'}/>
        <div className='mx-20'></div>
        <Campo etichetta={'Perchè'}/>
        <Campo etichetta={'Benefici che desidera'}/>
        </div>
           
        <div className='flex'>
        <Campo etichetta={'Dubbi/obiezioni'}/>     
        <Campo etichetta={'Emozioni che prova ora'}/>
        <div className='mx-20'></div>
        <Campo etichetta={'Risoluzione dubbi/obiezioni'}/>
        <Campo etichetta={'Emozioni che vuole provare'}/>
        </div>

    </div>
  )
}

export default AlignedTable