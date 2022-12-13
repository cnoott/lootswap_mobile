import React, {FC} from 'react';
import {MessageBoxContainer, TimeText, MessageText} from './styles';

interface LSMessageCellProps {
  onPress?: Function;
  item: any;
  self?: boolean;
}

const MessageCell: FC<LSMessageCellProps> = React.memo(props => {
  const {item, onPress = () => {}, self = false} = props;

  return (
    <MessageBoxContainer self={self} onPress={onPress}>
      <MessageText>{item}</MessageText>
      <TimeText>9.12 AM</TimeText>
    </MessageBoxContainer>
  );
});

export default MessageCell;
