import './App.css';
import AppBar from './Components/AppBar/AppBar';
import BattleTools from './Components/BattleTools/BattleTools';
import BattleArea from './Components/BattleArea/BattleArea';

function App() {
  return (
    <div className={'App'}>
      <AppBar />
      <div className={'AppContent'}>
        <BattleTools />
        <BattleArea />
      </div>
    </div>
  );
}

export default App;
