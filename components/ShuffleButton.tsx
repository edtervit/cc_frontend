import React from 'react'

function ShuffleButton() {
  return (
    <div className="cursor-pointer border-black border p-1 hover:scale-110 transition-all">
      <img className="w-6" src="./icons/random.svg" alt="random" />
    </div>
  )
}

export default ShuffleButton