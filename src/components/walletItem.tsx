import { LogoImage, BlockAlignRight, Circle, ModalItemContainer, InnterCircle } from './styles';

import React, { FC } from 'react';
import { TextInputProps } from 'react-native';
import { WALLET_ELLIPSE } from '../constants/constants';
import { TextL } from './text';
import { FontFamily, Type } from '../enums';

interface InputProps extends TextInputProps {
  item?: any;
  onPress: (item: any) => void;
}

export const WalletItem: FC<InputProps> = React.memo((props) => {
  const {
    item: { name, walletId, selected },
    onPress,
    item,
  } = props;

  return (
    <ModalItemContainer onPress={() => onPress(item)}>
      <LogoImage source={WALLET_ELLIPSE} />
      <TextL type={Type.Primary} title={name} family={FontFamily.Medium} />
      <TextL type={Type.Placeholder} title={` (${walletId})`} family={FontFamily.Medium} />
      <BlockAlignRight>
        <Circle>{selected && <InnterCircle />}</Circle>
      </BlockAlignRight>
    </ModalItemContainer>
  );
});
