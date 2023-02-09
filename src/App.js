
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { PoemGPT } from './pages/poemgpt';
import { LoveOracle } from './pages/loveoracle';

function App() {
  return (

    <Routes>
      <Route path="/" element={<LoveOracle/>}/>
      <Route path="/poem-gpt" element={<PoemGPT/>}/>
    </Routes>
  );
}

export default App;
