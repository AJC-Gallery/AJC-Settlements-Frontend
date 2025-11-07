// src/App.tsx
 import { BrowserRouter } from 'react-router-dom';
 import './App.css';
import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './routes/appRoutes';
// import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
 
      <BrowserRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
      </BrowserRouter>
   );
}

export default App;