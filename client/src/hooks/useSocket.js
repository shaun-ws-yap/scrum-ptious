import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export default function useSocket(loginToken) {
  const [socket, setSocket] = useState({});

  useEffect(() => {
    if (!loginToken) {
      return;
    }
    const conn = io();
    setSocket(conn);

    return () => {
      conn.close();
    }
  }, [loginToken])

  return { socket };
};