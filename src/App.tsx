// src/App.tsx
import { HashRouter } from 'react-router-dom';
import { StartPage } from './StartPage';

function App() {
  return (
    <HashRouter basename="/EZbooth">
      <StartPage />
    </HashRouter>
  );
}

export default App;
