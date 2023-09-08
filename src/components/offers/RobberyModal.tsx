import React, {FC} from 'react';
import {LSModal} from '../commonComponents/LSModal';
import LSButton from '../commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {
  ModalBodyText,
  ModalContainerView,
  ModalHeaderText,
  PercentText,
} from './RobberModalStyles';

interface RobberyModalProps {
  isModalVisible: boolean;
  setModalVisible: Function;
}

export const RobberyModal: FC<RobberyModalProps> = props => {
  const {isModalVisible, setModalVisible} = props;
  const closeModal = () => setModalVisible(false);

  return (
    <LSModal isVisible={isModalVisible} onBackdropPress={() => closeModal()}>
      <LSModal.BottomContainer>
        <ModalContainerView>
          <ModalHeaderText>This offer is unfair</ModalHeaderText>
          <ModalBodyText>
            The estimated market value of your offer is more than
            <PercentText> 30% below </PercentText>the value of what your asking.

          </ModalBodyText>
          <ModalBodyText>
            Tweak your offer to make it more enticing for the other person before you send it over.
          </ModalBodyText>

          <LSButton
            title={'Adjust Offer'}
            size={Size.Fit_To_Width}
            type={Type.Primary}
            radius={20}
            fitToWidth={'90%'}
            onPress={() => closeModal()}
          />

        </ModalContainerView>
        <LSModal.CloseButton onCloseButtonPress={() => closeModal()} />
      </LSModal.BottomContainer>
    </LSModal>
  );
};

export default RobberyModal;
