import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
     <div className="flex flex-col items-center justify-center gap-8 p-8 max-w-2xl w-full">
       <h1 className="text-4xl font-bold text-white mb-8">Learn about Redux Toolkit</h1>
       <div className="w-full">
         <AddTodo />
       </div>
       <div className="w-full">
         <Todos />
       </div>
     </div>
   </div>
  )
}

export default App
