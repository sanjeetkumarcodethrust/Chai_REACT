import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Card from './components/card'

function App() {
  const myobj={
    username:"sanjeet",
    age:20,
  }
  let myarr=[1,2,3,4,5]
  return (
    <div>

      {/* <h1 className="bg-green-500 text-yellow-300 p-8 rounded-xl text-2xl mb-4">
        TailWind test
      </h1> */}
      <Card username="chai aur code" btnText="click here"/>
      <Card username="sanjeet kumar" btnText="search to here"/>
       {/* <div className="max-w-xs rounded-md shadow-md bg-black text-gray-100">
      <img
        src="https://picsum.photos/301"
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide">Lorem</h2>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
            tempora ipsum soluta amet corporis accusantium aliquid consectetur
            eaque!
          </p>
        </div>
        <button
          type="button"
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-gray-800 text-gray-200"
        >
          Read more
        </button>
      </div>
    </div> */}

      {/* <div className="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl">

        <div>
          <img
            className="w-48 shadow-xl rounded-md"
            alt="cover"
            src="https://images.pexels.com/photos/29179706/pexels-photo-29179706.jpeg"
          />
        </div>

        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-2xl font-medium">Class Warfare</span>
          <span className="font-medium text-sky-500">The Anti-Patterns</span>

          <span className="flex gap-2 font-medium text-gray-600">
            <span>No. 4</span>
            <span>·</span>
            <span>2025</span>
          </span>
        </div>

      </div> */}

    </div>
  )
}

export default App