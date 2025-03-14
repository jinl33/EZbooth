// src/App.tsx
import { HashRouter } from 'react-router-dom';
import { StartPage } from './StartPage';

function App() {
  return (
    <HashRouter>
      <StartPage />
    </HashRouter>
  );
}

export default App;
