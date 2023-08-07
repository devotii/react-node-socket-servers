/*
  This version is most to show it live
*/
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

import socket from '../services/socket'

const motionAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function App() {
  const [page, setPage] = useState(0);

  const [response, setResponse] = useState([]);
  let [currIndex, setCurrIndex] = useState(1);

  const [servers, setServers] = useState([]);

  useEffect(() => {
    socket.on('client:request', onResponse);
    socket.on('client:servers', onServers);

    return () => {
      socket.off('client:request', onResponse);
      socket.off('client:servers', onServers);

      setResponse([]);
      setServers([]);
    }
  }, []);

  const onRequest = () => {
    return socket.emit('client:request');
  };

  const onResponse = data => {
    setResponse(prev => {
      prev = [...prev].reverse();
      data.key = currIndex;
      prev.push(data);
      return prev;
    });

    setCurrIndex(currIndex++)
  };
  
  const onGetServers = () => {
    if (page === 1) return setPage(0);
    
    setResponse([]);
    return socket.emit('client:servers');    
  };

  const onServers = data => {
    setPage(1);
    setServers(data);
  };

  return (
    <div className={`container`}>
      <div className={`title`}>
        Multi Socket Servers
        <a href='https://github.com/devotii' target='_blank'>made by devoti</a>
      </div>
  
      <div className={`card`} data-page={page}>
        <div className={`body response`}>
          {!response.length ? 
            <div className={`item`}>
              <span>I said:</span>

              <div className={`content`}>
                No requests has been sent.
              </div>
            </div>
          :
            <AnimatePresence>
              {response.reverse().map((res, key) => (
                <motion.div 
                  className={`item`}
                  variants={motionAnimation}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  layoutId={res.key}
                  key={res.key}
                >
                  <span>{res.name} said:</span>

                  <div className={`content`}>
                    {res.msg}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          }
        </div>

        <div className={`body servers`}>
          {!servers.length ?
            <div className={`server`}>
              No servers found
            </div>
          :
          servers.map((server, key) => (
            <div className={`server`} key={key}>
              <span className={`circle`} />
              {server}
            </div>
          ))
          }
        </div>
      </div>
      
      <div className={`buttons`}>
        <button onClick={() => onGetServers()}>
          {page === 1 ?
            'Go back':
            'Check servers'
          }
        </button>
        <button onClick={() => onRequest()} disabled={page === 1}>Send request</button>
      </div>
    </div>
  )
}