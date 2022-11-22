import React, { useCallback, useEffect } from 'react';

import { useStepData, useSetStep, maxStageLength } from '../../../state/stepState';

import ModalContainer from '../../ModalContainer/ModalContainer';

import { useTelegram } from '../../../hooks/useTelegram';

const Step1 = () => {

    const { tg, onToggleButton } = useTelegram();

    const stage = useStepData();
    const setStage = useSetStep();
  
    const nextStage = useCallback(() => {
      if (stage < maxStageLength) {
        setStage(stage + 1)
      }}, [stage, setStage]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: "NEXT"
        })
    }, [tg.MainButton])

    useEffect(() => {
        onToggleButton()
    }, [onToggleButton])

    useEffect(() => {
        const timeout = setTimeout(() => {
            tg.onEvent('mainButtonClicked', nextStage)
        }, 2000)
        return () => clearTimeout(timeout);
    }, [nextStage, tg])

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
        </ModalContainer>
    );
};

export default Step1;