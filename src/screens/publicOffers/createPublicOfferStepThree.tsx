import React, {FC, useState} from 'react';
import {StepContainer} from './styles';
import {StartTradeStepTwo} from '../offers/startTrade/startTradeStepTwo';

interface StepThreeProps {
  myItems: Array<any>;
  setMyItems: Function;
}

export const CreatePublicOfferStepThree: FC<StepThreeProps> = props => {
  const {myItems, setMyItems} = props;

  return (
    <StepContainer>
      <StartTradeStepTwo myItems={myItems} setMyItems={setMyItems} />
    </StepContainer>
  );
};

export default CreatePublicOfferStepThree;
