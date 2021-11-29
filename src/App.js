import './App.css';
import AppRouter from './component/router';

function App({socket}) {
  return (
    <div className="App">
      {/* <Three socket={socket}/> */}
      <AppRouter socket={socket}/>
    </div>
  );
}

export default App;
