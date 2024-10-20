import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './components/navbar2.tsx'
import Home from './pages/main_routes/home.tsx'
import Academics from './pages/main_routes/academics.tsx';
import Admission from './pages/main_routes/admission.tsx';
import Announcement from './pages/main_routes/announcement.tsx';
import Footer from './components/footer.tsx';
import About from './pages/main_routes/about.tsx';
import Career from './pages/main_routes/career.tsx';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about">
          <Route index element={<About/>} />
          <Route path="profile" element={<About/>} />
          <Route path="administration" element={<About/>} />
          <Route path="offices" element={<About/>} />
          <Route path="contact" element={<About/>} />
        </Route>
        <Route path="/academics" element={<Academics />} />
        <Route path="/admissions" element={<Admission />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/careers" element={<Career />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    {/* <App /> */}
  </StrictMode>,
)
