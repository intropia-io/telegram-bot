import React from 'react';
import './StageNavigator.css';
import { useStageData, maxStageLength } from '../../state/stageState';

const StageNavigator = (props) => {
    const stage = useStageData();

    const stagesArray = Array.from(Array(maxStageLength));

    return (
        <div className={'stageNavigator ' + props.className}>
            {stagesArray.map((el, index) =>
              <div key={index} className={`stageNavigator__stage ${index + 1 <= stage && 'passed'}`}></div>
            )}
            
        </div>
    );
};

export default StageNavigator;