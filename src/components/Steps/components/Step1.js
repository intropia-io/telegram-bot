import React, { useEffect } from 'react';

import { useTelegram } from '../../../hooks/useTelegram';
import ModalConteiner from '../../ModalContainer/ModalContainer';

const Step1 = () => {

    const { tg } = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: "NEXT"
        })
    }, [])

    useEffect(() => {
        tg.MainButton.show();
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