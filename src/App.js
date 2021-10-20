import './App.css';
import text from './text.json';

function App() {
  return (
    <div>
      {
        JSON.stringify(text)
      }
    </div>
  );
}

export default App;
