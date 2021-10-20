import './App.css';
import First from './page/first.js';
import Three from './page/three.js';
import FlexBox from './page/flexbox.js';

function App({socket}) {
  return (
    <div className="App">
      <Three socket={socket}/>
    </div>
  );
}

export default App;
