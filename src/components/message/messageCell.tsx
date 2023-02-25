import React, {FC} from 'react';
import {MessageBoxContainer, TimeText, MessageText} from './styles';

interface LSMessageCellProps {
  onPress?: Function;
  item: any;
  self?: boolean;
}

const MessageCell: FC<LSMessageCellProps> = React.memo(props => {
  const {item, onPress = () => {}, self = false} = props;

  if (item === 'trade-update') {
    return;
  } else {
    return (
      <MessageBoxContainer self={self} onPress={onPress}>
        <MessageText self={self}>{item}</MessageText>
        <TimeText />
      </MessageBoxContainer>
    );
  }
});

export default MessageCell;
