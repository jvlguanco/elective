import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import App from './App.tsx';
import Navbar from './components/navbar2.tsx'
import Home from './pages/main_routes/home.tsx'
import About from './pages/main_routes/about.tsx';
import Academics from './pages/main_routes/academics.tsx';
import Admission from './pages/main_routes/admission.tsx';
import Announcement from './pages/main_routes/announcement.tsx';
import Footer from './components/footer.tsx';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about">
          <Route index element={<div>Index</div>} />
          <Route path="profile" element={<div>Profile</div>} />
          <Route path="administration" element={<div>Admins</div>} />
          <Route path="offices" element={<div>Offices</div>} />
          <Route path="contact" element={ <div>Contact</div>} />
        </Route>
        <Route path="/academics" element={<Academics />} />
        <Route path="/admissions" element={<Admission />} />
        <Route path="/announcement" element={<Announcement />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    {/* <App /> */}
  </StrictMode>,
)
