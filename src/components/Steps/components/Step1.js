import React, { useCallback, useEffect } from 'react';

import { useTelegram } from '../../../hooks/useTelegram';

import ModalConteiner from '../../ModalContainer/ModalContainer';

const Step1 = () => {

    const { tg } = useTelegram();

    const stage = useStepData();
    const setStage = useSetStep();
  
    const nextStage = useCallback(() => {
      if (stage < 6) {
        setStage(stage + 1)
      }}, [stage]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: "NEXT"
        })
    }, [])

    useEffect(() => {
        tg.MainButton.show();
    }, [tg])

    useEffect(() => {
        tg.WebApp.onEvent('mainButtonClicked', nextStage)
        return () => {
            tg.WebApp.offEvent('mainButtonClicked', nextStage)
        }
    }, [])

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