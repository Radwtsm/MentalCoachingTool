import React from 'react'

const Campo = ({etichetta}) => {
  return (
    <div className="text-sm w-full basis-1/2">
                  <p className="text-left" style={{fontSize:16}}>{etichetta}</p>

                  <div
                    contentEditable
                    // onChange={(e) => isNotEmpty(e.target)}
                    className="text-left text-black text-sm w-full p-1 font-normal resize-none	"
                    style={{fontSize:12,width:'300px'}}
                    aria-label="empty textarea"
                    placeholder="..."
                    // maxLength={261}
                    // onKeyDown={(e)=>{
                    //   if (e.currentTarget.innerHTML.length > 261 && e.key !== 'Backspace'){
                    //     e.preventDefault()
                    //   }
                    // }}  
                  />
                </div>
  )
}

export default Campo