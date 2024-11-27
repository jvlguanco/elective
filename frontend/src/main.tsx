import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter, useLocation
} from 'react-router-dom';
import Frontend from './frontend/App'
import Backend from './backend/App'
import './index.css'

const App = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return isAdminRoute ? <Backend /> : <Frontend />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
