import React from 'react'

function ShuffleButton() {
  return (
    <div className="cursor-pointer border-black hover:scale-110 transition-all">
      <img className="w-5" src="./icons/random.svg" alt="random" />
    </div>
  )
}

export default ShuffleButton