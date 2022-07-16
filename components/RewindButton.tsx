import React from 'react'

function RewindButton() {
  return (
    <div className="cursor-pointer border-black border p-1 hover:scale-110 transition-all">
      <img className="w-6" src="./icons/rewind.svg" alt="rewind" />
    </div>
  )
}

export default RewindButton