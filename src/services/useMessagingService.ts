import {useEffect, useState} from 'react';
import socketIo from 'socket.io-client';
import {baseURLMessage, baseURLPriveteMessage} from './apiHelpers';

const useMessagingService = (authObj: any, isPrivete?: boolean) => {
  const [socketObj, setSocket] = useState(null);
  const [isConnected, setConnected] = useState(false);
  useEffect(() => {
    if (socketObj == null) {
      connect();
    }
  });
  const connect = () => {
    const _socketObj = socketIo(
      isPrivete ? baseURLPriveteMessage : baseURLMessage,
      {
        transports: ['websocket'],
        upgrade: false,
        auth: authObj,
      },
    );
    _socketObj.connect();
    initListners(_socketObj);
  };
  const initListners = (_socketObj: any) => {
    if (_socketObj) {
      _socketObj.on('connect', () => {
        setSocket(_socketObj);
        setConnected(true);
      });
    }
  };
  return {socketObj, isConnected};
};

export default useMessagingService;
