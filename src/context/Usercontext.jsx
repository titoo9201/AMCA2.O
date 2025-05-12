
import { createContext, useState } from 'react'
import run from '../gemni';
export const datacontext=createContext()

function Usercontext({children}) { // speak function bol rahi hai ye 
let [speaking,setSpeaking]=useState(false)
let[prompt,setPrompt]=useState("listening....")
let[response,setResponse]=useState(false)

 function speak(text) {
  window.speechSynthesis.cancel();
  const synth = window.speechSynthesis;
  const text_speak = new SpeechSynthesisUtterance(text);
  text_speak.volume = 1;
  text_speak.rate = 1;
  text_speak.pitch = 1;

  const setVoiceAndSpeak = () => {
    const voices = synth.getVoices();

    let selectedVoice = voices.find(v => v.lang === "hi-IN") ||
                        voices.find(v => v.name.toLowerCase().includes("hindi")) ||
                        voices[0]; // fallback

    text_speak.voice = selectedVoice;
    text_speak.lang = selectedVoice.lang;

    text_speak.onend = () => {
      setSpeaking(false);
    };
    text_speak.onerror = (e) => {
      console.error("Speech error:", e.error);
      setSpeaking(false);
    };

    synth.speak(text_speak);
  };

  if (synth.getVoices().length === 0) {
    const handleVoicesChanged = () => {
      setVoiceAndSpeak();
      synth.removeEventListener('voiceschanged', handleVoicesChanged);
    };
    synth.addEventListener('voiceschanged', handleVoicesChanged);
  } else {
    setVoiceAndSpeak();
  }
}


 async function AIrespone(prompt)
{
let text= await run(prompt)
let newText=text.replace(/\*+/g, "");
newText = newText.replace(/google/gi, "Titoo Singh");
setPrompt(newText)
speak(newText)
setResponse(true) 

 
 
}
  // speech recognition ke liye hai and pass kiya isko gemni ko 
let speechRecognition=window.SpeechRecognition || 
window.webkitSpeechRecognition
let recognition =new speechRecognition()
recognition.onresult=(e)=>{
let curindex=e.resultIndex;
let transcript=e.results[curindex][0].transcript;
setPrompt(transcript)
takecommand(transcript.toLowerCase())
}
function takecommand(command)
{ if(command.includes("open")&&command.includes("youtube"))
{

setPrompt("opening youtube...")
speak("opening youtube")
window.open("https://www.youtube.com/","_blank")
setResponse(true)

} 

else if(command.includes("open")&&command.includes("google"))
  {
 
  setPrompt("opening google...")
  speak("opening google")
 window.open("https://www.google.com/","_blank")
  setResponse(true)
  
  }
else if(command.includes("open")&&command.includes("instagram"))
    {
    setPrompt("opening instagram...")
    speak("opening instagram")
    window.open("https://www.instagram.com/","_blank")
   
    setResponse(true)
    
    }
  else if (command.includes("time"))
    {
      let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
      speak(time)
      setResponse(true)
      setPrompt(time)
    }
 else if(command.includes("open")&&command.includes("whatsapp")) 
  {
    setPrompt("opening whatsapp...")
    speak("opening whatsapp")
    window.open("whatsapp://")
    setResponse(true)
  }  
else if (command.includes("date")) {
  const now = new Date();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayName = days[now.getDay()];
  const day = now.getDate();
  const monthName = months[now.getMonth()];
  const year = now.getFullYear();

  const formattedDate = `${dayName}, ${day} ${monthName} ${year}`;

  console.log("Formatted Date:", formattedDate);
  setPrompt(formattedDate);
  speak(formattedDate);
  setResponse(true);
}   

else 
{
  AIrespone(command)
}
}

let value={
recognition,
speaking,
setSpeaking,
prompt,
setPrompt,
response,
setResponse

}
  return (
    <div>
      <datacontext.Provider value={value}>
        {children}
        </datacontext.Provider>
    </div>
  )
}

export default Usercontext

