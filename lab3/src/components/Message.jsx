import React from 'react'
import { useEffect, useState } from 'react';

export const Message = () => {
    const [coords, setCoords] = useState({x:0, y:0});

    useEffect(() =>{

        const onMouseMove = ({clientX: x, clientY: y}) => {
          setCoords({x,y})
        }
        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        }
    }, []);

  return (
    <div>Message</div>
  )
}
