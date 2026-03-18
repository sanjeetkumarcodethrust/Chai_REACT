import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [counter,setCounter]=useState(15)
  // let counter=15;
  const addvalue=()=>{
    console.log("clicked", counter);
    // counter=counter+1;
    setCounter((prev)=>prev+1)
    setCounter((prev)=>prev+1)
    setCounter((prev)=>prev+1)
    setCounter((prev)=>prev+1)
  }
  const removevalue=()=>{
    console.log("clicked", counter);
    // counter=counter-1;
    setCounter(counter-1)
  }

  return (
   <>
   <h1>chai aur react </h1>
   <h2>counter value: {counter}</h2>

   <button
   onClick={addvalue}>add value{counter}</button>
   <br />
   <button
   onClick={removevalue}>remove value {counter}</button>
   <p>footer:{counter}</p>
   </>
  )
}

export default App
