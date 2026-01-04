import React, { useState } from 'react'
import { LuImage,LuX } from "react-icons/lu";
import EmojiPicker from "emoji-picker-react"

const EmojiPickerUp = ({icon,onSelect}) => {
  const[openEP,setEP]=useState(false)
  return (
    <div className='emojipickcontainer'>
      <div className='icon-image' onClick={()=>{setEP(true)}}>
        <div className='icon'>
            {icon?<img width={'40px'}src={icon} alt='icon'/>:<LuImage/>}
        </div>
        <p style={{fontSize:'12px'}}>{icon?'change Icon':'pick Icon'}</p>
      </div>
      {openEP && (
        <div className='emojicontainer'>
          <button className='emojibtn' onClick={()=>setEP(false)}>
            <LuX/>
          </button>
          <EmojiPicker height={'400px'} width={'300px'}
          open={openEP}
          onEmojiClick={(emoji)=>onSelect(emoji?.imageUrl||'')}/>
          </div>
        )}
    </div>
  )
}

export default EmojiPickerUp