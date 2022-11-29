import { LogoImage, BlockAlignRight, Circle, ModalItemContainer, InnterCircle } from './styles';

import React, { FC } from 'react';
import { TextInputProps } from 'react-native';
import { HEADERLOGO } from '../constants/constants';
import { TextL } from './text';
import { FontFamily, Type } from '../enums';

interface InputProps extends TextInputProps {
  item?: any;
  onPress: (item: any) => void;
}

export const ChainItem: FC<InputProps> = React.memo((props) => {
  const {
    item: { name, selected },
    onPress,
    item,
  } = props;

  return (
    <ModalItemContainer onPress={() => onPress(item)}>
      <LogoImage source={HEADERLOGO} />
      <TextL type={Type.Primary} title={name} family={FontFamily.Medium} />
      <BlockAlignRight>
        <Circle>{selected && <InnterCircle />}</Circle>
      </BlockAlignRight>
    </ModalItemContainer>
  );
});
