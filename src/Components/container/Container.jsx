import React from 'react'

function Container({children ,className = ""}  ) {
  return (
    <div className= {`flex gap-4 p-4 ${className} `}>
        {children}
    </div>
  )
}

export default Container