import React, { use } from 'react';

function Card({username,btnText="read more"}) {
    console.log(username);
  return (
    <div>

      <h1 className="bg-green-500 text-yellow-300 p-8 rounded-xl text-2xl mb-4">
        TailWind test
      </h1>
       <div className="max-w-xs rounded-md shadow-md bg-black text-gray-100">
      <img
        src="https://picsum.photos/301"
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide">Lorem
            {username}
          </h2>
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
          {btnText}
        </button>
      </div>
    </div>
    </div>
 )
 }
 export default Card;