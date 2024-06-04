import { observer } from 'mobx-react-lite';
import { Home } from './pages/Home';
import { Game } from './pages/Game';
import { data } from './store/data';
import { EndGame } from './components/EndGame';
import './App.css';

function App() {
  return <>
    <div className="container">
      {data.startGame ?
        <><Game /> {data.winStatus !== undefined && <EndGame />}</>
        : <Home />
      }
    </div>
  </>
}

export default observer(App);
