import React, { useMemo } from 'react';
import { useStepData } from '../../state/stepState';

import StepNavigator from '../StepNavigator/StepNavigator';

import Step1 from './components/Step1';

const StepRouter = () => {
    const stage = useStepData();

    const stepComponent = useMemo(() => {
        switch (stage) {
            case 1:
                return <Step1 />;
            default:
                return <h2>{stage}</h2>    
        }
    }, [stage])
  
    return (
        <>
          <StepNavigator />
          {stepComponent}
        </>
    );
};

export default StepRouter;