import React, { useCallback } from 'react';

import { useStepData, useSetStep, maxStageLength } from '../../../state/stepState';

import ModalContainer from '../../ModalContainer/ModalContainer';

// import { useTelegram } from '../../../hooks/useTelegram';
import Button from '../../Button/Buttton';

const Step1 = () => {

    // const { tg } = useTelegram();

    const stage = useStepData();
    const setStage = useSetStep();
  
    const nextStage = useCallback(() => {
      if (stage < maxStageLength) {
        setStage(stage + 1)
      }}, [stage, setStage]);

    return (
        <ModalContainer>
            <div>
                <p>
                    Hey:) I’m Spike, tr3butor assistant.
                </p>
            </div>

            <div>
                <p>
                    I’ll help you to customize web3 opportunity feed
                </p>
            </div>

            <Button onClick={nextStage}>Next</Button>
        </ModalContainer>
    );
};

export default Step1;