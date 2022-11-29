import {
  ItemContainer,
  RowContainer,
  Image,
  Block,
  MarginT,
  MarginL,
  BlockAlignRight,
} from './styles';

import React, { FC } from 'react';
import { HEADERLOGO, USDC_COIN, USDT_COIN } from '../constants/constants';
import { TextL } from './text';
import { FontFamily, Type } from '../enums';
interface HomeItemProps {
  item?: any;
}

export const HomeItem: FC<HomeItemProps> = React.memo((props) => {
  const { id, name, category, serial, price } = props.item;

  const getImage = (itemId: number) => {
    let img = HEADERLOGO;
    switch (itemId) {
      case 1:
        img = HEADERLOGO;
        break;
      case 2:
        img = USDC_COIN;
        break;
      case 3:
        img = USDT_COIN;
        break;
      default:
        break;
    }
    return img;
  };

  return (
    <ItemContainer>
      <RowContainer>
        <Image source={getImage(id)} />
        <MarginL ml={12} />
        <Block>
          <TextL type={Type.Primary} title={name} family={FontFamily.Medium} />
          <MarginT mt={5} />
          <TextL type={Type.Placeholder} title={category} />
        </Block>
        <BlockAlignRight>
          <TextL type={Type.Primary} title={serial} family={FontFamily.Medium} />
          <MarginT mt={5} />
          <TextL type={Type.Placeholder} title={`~${price}`} />
        </BlockAlignRight>
      </RowContainer>
    </ItemContainer>
  );
});
