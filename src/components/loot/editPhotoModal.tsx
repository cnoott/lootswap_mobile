import React, {FC} from 'react';
import {LSModal} from '../commonComponents/LSModal';
import LSButton from '../commonComponents/LSButton';
import {Size, Type} from '../../enums';

import {
  ImagePickerModalStyle,
  Container,
  ButtonContainer,
} from './styles';

interface EditPhotoProps {
  isVisible: boolean;
  closeModal: Function;
  onEditPress: Function;
  onDeletePress: Function;
}

const EditPhotoModal: FC<EditPhotoProps> = props => {
  const {isVisible, closeModal, onEditPress, onDeletePress} = props;

  return (
    <LSModal
      isVisible={isVisible}
      style={ImagePickerModalStyle}
      onBackdropPress={() => closeModal()}>

      <LSModal.BottomContainer>
        <Container>
          <ButtonContainer>
            <LSButton
              title={'Edit'}
              size={Size.Large}
              type={Type.Grey}
              radius={20}
              onPress={() => onEditPress()}
            />
          </ButtonContainer>
          <ButtonContainer>
            <LSButton
              title={'Delete'}
              size={Size.Large}
              type={Type.Error}
              radius={20}
              onPress={() => {
                onDeletePress();
                closeModal();
              }}
            />
          </ButtonContainer>
          <LSModal.CloseButton onCloseButtonPress={() => closeModal()} />
        </Container>
      </LSModal.BottomContainer>
    </LSModal>

  );
};

export default EditPhotoModal;
