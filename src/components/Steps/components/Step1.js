import React, { useCallback, useEffect } from 'react';

import { useStepData, useSetStep, maxStageLength } from '../../../state/stepState';

import ModalConteiner from '../../ModalContainer/ModalContainer';

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
        tg.onEvent('mainButtonClicked', nextStage)
        return () => {
            tg.offEvent('mainButtonClicked', nextStage)
        }
    }, [nextStage, tg])

    return (
        <ModalConteiner>
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
        </ModalConteiner>
    );
};

export default Step1;