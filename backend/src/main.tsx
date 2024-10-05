import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './index.css'
import Navbar from './components/navbar';
import Home from './pages/home';
import Sidebar from './components/sidebar';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Sidebar/>
    </BrowserRouter>
  </StrictMode>,
)
