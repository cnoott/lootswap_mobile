import {useEffect} from 'react';
import socketIo from 'socket.io-client';
import {baseURLMessage} from './apiHelpers';

export let socketObj: any = null;
const useMessagingService = (authObj: any) => {
  useEffect(() => {
    // if (socketObj == null) {
    //   connect();
    // }
    connect();
  });
  const connect = () => {
    socketObj = socketIo(baseURLMessage, {
      transports: ['websocket'],
      upgrade: false,
      auth: authObj,
    });
    socketObj.connect();
    // initListners();
  };
  // const initListners = () => {
  //   if (socketObj) {
  //     socketObj.on('connect', () => {
  //       // Socket Connected
  //       console.log('<==== Socket Connected ====>');
  //     });
  //   }
  // };
  return socketObj;
};

export default useMessagingService;
