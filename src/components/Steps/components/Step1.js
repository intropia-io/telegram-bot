import React, { useCallback, useEffect } from 'react';

import { useStepData, useSetStep, maxStageLength } from '../../../state/stepState';

import ModalConteiner from '../../ModalContainer/ModalContainer';

import { useTelegram } from '../../../hooks/useTelegram';

const Step1 = () => {

    const { tg } = useTelegram();

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
        tg.MainButton.show();
    }, [tg.MainButton])

    useEffect(() => {
        tg.WebApp.onEvent('mainButtonClicked', nextStage)
        return () => {
            tg.WebApp.offEvent('mainButtonClicked', nextStage)
        }
    }, [nextStage, tg.WebApp])

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