import React from 'react'

let a,b;
[a,b] = [10,20]

const Variables = () => {
  return (
    <div>Variables
        <ul>
            <li>a = {a}</li>
            <li>b = {b}</li>
        </ul>
    </div>
        

  )
}

export default Variables