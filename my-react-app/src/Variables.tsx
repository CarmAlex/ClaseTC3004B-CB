import React from 'react'
import { Fragment } from 'react';

let a,b;
[a,b] = [10,20]

/*
const getResult=(x,y)=>{
  return x+y;
}
*/

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