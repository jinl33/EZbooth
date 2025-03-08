// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { StartPage } from './StartPage';

function App() {
  return (
    <BrowserRouter basename="/EZbooth">
      <StartPage />
    </BrowserRouter>
  );
}

export default App;
