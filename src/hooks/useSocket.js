import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export default function useSocket(loginToken) {
  const [socket, setSocket] = useState({});

  useEffect(() => {
    if (!loginToken) {
      return;
    }
    console.log('connect');
    const conn = io();
    setSocket(conn);

    return () => {
      console.log('close');
      conn.close();
    }
  }, [loginToken])

  return { socket };
};