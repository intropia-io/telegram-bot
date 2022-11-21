import { useEffect } from 'react';
import { RecoilRoot } from "recoil";

import './App.css';
import StageNavigator from './components/StageNavigator/StageNavigator';
import { useTelegram } from './hooks/useTelegram';
import { useStageData, useSetStage } from './state/stageState';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg])

  return (
    <RecoilRoot>
      <div className="container">
        <StageNavigator />
        telegram-bot
        <NextButton />
    </div>
    </RecoilRoot>
  );
}

const NextButton = () => {
  const stage = useStageData();
  const setStage = useSetStage();

  const nextStage = () => {
    setStage(stage + 1)
  }

  return (
    <button onClick={nextStage}>nextStage</button>
  )
}

export default App;
