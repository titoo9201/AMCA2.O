import React, { use, useContext } from 'react'
import "./App.css"
import va from "./assets/TI.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/Usercontext';


import img from "./assets/speak.gif"
import wav from "./assets/aiVoice.gif"


function App() {
  
let {recognition,speaking,setSpeaking,prompt,response,setPrompt,setResponse}=useContext(datacontext)

  return (
    <div className='main'>
      <img src={va} alt="" id="amca" />
    <span>I'm Amca your Advanced virtual Assistant</span>
    {
      !speaking?
      <button onClick={()=>{
        setPrompt("listening....")
        setSpeaking(true)
        setResponse(false)
        recognition.start()
      }} >click here<CiMicrophoneOn /></button>
      :
      <div className='gif'>
        {!response?<img src={img} alt="" id="img" />:<img src={wav} alt="" id="wav" />}
       <p>{prompt}</p>
      </div>

    }
    
    </div>

  )
}

export default App
