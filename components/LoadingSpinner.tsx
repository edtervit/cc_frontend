import React from 'react'

function LoadingSpinner() {
  return (
    <div>
      <img className="w-12 animate-[spin_2s_linear_infinite]" src="./icons/wait-loader.svg" alt="loading spinner" />
    </div>
  )
}

export default LoadingSpinner