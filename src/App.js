import { useEffect } from 'react';
import { RecoilRoot } from "recoil";

import './App.css';
import StepRouter from './components/Steps/StepRouter';
import { useTelegram } from './hooks/useTelegram';
import { useStepData, useSetStep, maxStageLength } from './state/stepState';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg])

  return (
    <RecoilRoot>
      <div className="container">
        <StepRouter />
        <NextButton />
    </div>
    </RecoilRoot>
  );
}

export default App;
