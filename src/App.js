import { useEffect } from 'react';
import { RecoilRoot } from "recoil";

import './App.css';
import ModalContainer from './components/ModalContainer/ModalContainer';
import StageNavigator from './components/StageNavigator/StageNavigator';
import { useTelegram } from './hooks/useTelegram';
import { useStageData, useSetStage, maxStageLength } from './state/stageState';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg])

  return (
    <RecoilRoot>
      <div className="container">
        <StageNavigator />
        <ModalContainer />
        <NextButton />
    </div>
    </RecoilRoot>
  );
}

const NextButton = () => {
  const stage = useStageData();
  const setStage = useSetStage();

  const nextStage = () => {
    if (stage < maxStageLength) {
      setStage(stage + 1)
    }
  }

  return (
    <button onClick={nextStage}>nextStage</button>
  )
}

export default App;
