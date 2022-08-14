import React from 'react'

function LoadingSpinner(props:{black?: boolean}, black= false) {
  return (
    <div>
      {black ? (
         <img className="w-12 animate-[spin_2s_linear_infinite]" src="./icons/wait-loader-black.svg" alt="black loading spinner" />
        ) : (
        <img className="w-12 animate-[spin_2s_linear_infinite]" src="./icons/wait-loader.svg" alt="loading spinner" />
      )}
    </div>
  )
}

export default LoadingSpinner