import React from 'react'
import Color from './Color'
import ArrayEdit from './ArrayEdit'
import ElementEdit from './ElementEdit'
import EditBarraEl from '../EditBarraEl'



const Settings = ({settings,changeable}) => {
  return (
    <div>
        <Color settings={settings} changeable={changeable} />
        {/* <ArrayEdit changeable={changeable}/> */}
        {/* <ElementEdit changeable={changeable}/> */}
        <EditBarraEl changeable={changeable}/>
    </div>
  )
}

export default Settings