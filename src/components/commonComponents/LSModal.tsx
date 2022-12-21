import React from 'react';
import RNModal from 'react-native-modal';
import {ModalViewContainer} from './LSModalStyles';

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

LSModal.Container = ModalContainer;
