import React from 'react'
import Color from './Color'
import ArrayEdit from './ArrayEdit'
import ElementEdit from './ElementEdit'



const Settings = ({settings,changeable}) => {
  return (
    <div>
        <Color settings={settings} changeable={changeable} />
        <ArrayEdit changeable={changeable}/>
        <ElementEdit changeable={changeable}/>
    </div>
  )
}

export default Settings