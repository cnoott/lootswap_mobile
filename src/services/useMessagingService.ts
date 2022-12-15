import {useEffect} from 'react';
import socketIo from 'socket.io-client';
import {baseURL} from './apiHelpers';

export let socketObj: any = null;
const useMessagingService = () => {
  useEffect(() => {
    if (socketObj == null) {
      connect();
    }
  });
  const connect = () => {
    socketObj = socketIo(baseURL, {
      transports: ['websocket'],
      upgrade: false,
    });
    socketObj.connect();
    initListners();
  };
  const initListners = () => {
    if (socketObj) {
      socketObj.on('connect', () => {
        // Socket Connected
        console.log('<==== Socket Connected ====>');
      });
    }
  };
  return socketObj;
};

export default useMessagingService;
