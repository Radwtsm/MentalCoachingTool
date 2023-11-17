import React, { useEffect, useState } from 'react'
// import { collection, getDocs, getDoc, doc } from "firebase/firestore";
// import { db } from './firebaseconfig';
import { settings } from './firebaseconfig'

const Color =  () => {
    function onChange(e) {
        console.log(e.target.value)
        settings.utils.setColor(e.target.value)
    }
    const [color,setColor] = useState('')

    settings.utils.getColor().then((color=>setColor(color.data().colore)))

    return (
        <div>
        <p>color</p>
        <input type="color" value={color} onChange={(e)=>onChange(e)}/>
        </div>
    )
}

export default Color