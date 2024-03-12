import React, {useState} from 'react';
import {TOOLTIP_ICON} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';
import {Container, IconContainer, TooltipText, ModalContainer} from './styles';
import {LSModal} from '../commonComponents/LSModal';

interface TooltipProps {
  text?: string;
}

const Tooltip = (props: TooltipProps) => {
  const {text} = props;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <LSModal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <LSModal.Container>
          <ModalContainer>
            <SvgXml xml={TOOLTIP_ICON} width={32} height={32} />
            <TooltipText>{text}</TooltipText>
          </ModalContainer>
          <LSModal.CloseButton
            onCloseButtonPress={() => setModalVisible(false)}
          />
        </LSModal.Container>
      </LSModal>
      <IconContainer onPress={() => setModalVisible(true)}>
        <SvgXml xml={TOOLTIP_ICON} width={20} height={20} />
      </IconContainer>
    </>
  );
};

export default Tooltip;
