import React from 'react';

import { useStepData, maxStageLength } from '../../state/stepState';

import './StepNavigator.css';

const StepNavigator = (props) => {
    const stage = useStepData();

    const stagesArray = Array.from(Array(maxStageLength));

    return (
        <div className={'StepNavigator ' + props.className}>
            {stagesArray.map((el, index) =>
              <div key={index} className={`StepNavigator__stage ${index + 1 <= stage && 'passed'}`}></div>
            )}
            
        </div>
    );
};

export default StepNavigator;