import {useEffect} from 'react';
import socketIo from 'socket.io-client';
import {baseURLMessage, baseURLPriveteMessage} from './apiHelpers';

export let socketObj: any = null;
const useMessagingService = (authObj: any, isPrivete: boolean) => {
  useEffect(() => {
    // if (socketObj == null) {
    //   connect();
    // }
    connect();
  });
  const connect = () => {
    socketObj = socketIo(isPrivete ? baseURLPriveteMessage : baseURLMessage, {
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
