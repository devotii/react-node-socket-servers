import React, { useEffect, useState } from 'react'

import socket from '../services/socket'

export default function App() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    socket.on('client:response', onResponse);

    return () => {
      socket.off('client:response', onResponse);
    }
  }, []);

  const onRequest = () => {
    socket.emit('client:request');
  }

  const onResponse = data => {
    setResponse(prev => {
      prev = [...prev];
      prev.unshift(data);
      return prev;
    })
  }
  
  return (
    <div className={`container`}>
      <div className={`title`}>
        Multi server communication
        <a href='https://github.com/devotii' target='_blank'>made by devoti</a>
      </div>
  
      <div className={`card`}>
        {!response.length ? 
          <div className={`item`}>
            <span>I said:</span>

            <div className={`content`}>
              No requests has been sent.
            </div>
          </div>
        :
        response.map((res, key) => (
          <div className={`item`} key={key}>
            <span>{res.name} said:</span>

            <div className={`content`}>
              {res.msg}
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => onRequest()}>Send request</button>
    </div>
  )
}
