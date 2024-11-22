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
import Bids from './pages/main_routes/bids.tsx';
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
        <Route path="/academic">
          <Route index element={<Academics location="colleges"/>} />
          <Route path="colleges" element={<Academics location="colleges"/>} />
          <Route path="graduate" element={<Academics location="graduate"/>} />
          <Route path="calendar" element={<Academics location="calendar"/>} />
          <Route path="obe" element={<Academics location="obe"/>} />
        </Route>
        <Route path="/admission">
          <Route index element={<Admission location="plmat"/>} />
          <Route path="plmat" element={<Admission location="plmat"/>} />
          <Route path="cmat" element={<Admission location="cmat"/>} />
          <Route path="clat" element={<Admission location="clat"/>} />
        </Route>
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/bids-and-awards" element={<Bids />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    {/* <App /> */}
  </StrictMode>,
)
