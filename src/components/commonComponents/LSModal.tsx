import React from 'react';
import RNModal from 'react-native-modal';
import {SvgXml} from 'react-native-svg';
import {TRADE_MODAL_CLOSE_BUTTON} from 'localsvgimages';
import {
  ModalViewContainer,
  ModalBottomViewContainer,
  CloseTouchable,
} from './LSModalStyles';

type LSModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
};
export const LSModal = ({
  isVisible = false,
  children,
  ...props
}: LSModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      propagateSwipe={true}
      animationInTiming={150}
      animationOutTiming={100}
      backdropTransitionInTiming={100}
      backdropTransitionOutTiming={100}
      {...props}>
      {children}
    </RNModal>
  );
};

const ModalContainer = ({children}: {children: React.ReactNode}) => (
  <ModalViewContainer>{children}</ModalViewContainer>
);

const ModalBottomContainer = ({children}: {children: React.ReactNode}) => (
  <ModalBottomViewContainer>{children}</ModalBottomViewContainer>
);

const ModalCloseButton = ({
  onCloseButtonPress,
}: {
  onCloseButtonPress: Function;
}) => (
  <CloseTouchable onPress={() => onCloseButtonPress()}>
    <SvgXml xml={TRADE_MODAL_CLOSE_BUTTON} />
  </CloseTouchable>
);

LSModal.Container = ModalContainer;
LSModal.BottomContainer = ModalBottomContainer;
LSModal.CloseButton = ModalCloseButton;
