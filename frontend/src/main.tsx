import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import App from './App.tsx';
import Navbar from './components/navbar.tsx'
import Home from './pages/main_routes/home.tsx'
import About from './pages/main_routes/about.tsx';
import Academics from './pages/main_routes/academics.tsx';
import Admission from './pages/main_routes/admission.tsx';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/admissions" element={<Admission />} />
      </Routes>
      <Navbar />
    </BrowserRouter>
    {/* <App /> */}
  </StrictMode>,
)
