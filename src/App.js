import { useEffect } from 'react';
import { RecoilRoot } from "recoil";

import './App.css';
import StepRouter from './components/Steps/StepRouter';
import { useTelegram } from './hooks/useTelegram';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
    tg.setHeaderColor('#141829');
    tg.setBackgroundColor('#141829');
  }, [tg])

  return (
    <RecoilRoot>
      <div className="container">
        <StepRouter />
      </div>
    </RecoilRoot>
  );
}

export default App;
