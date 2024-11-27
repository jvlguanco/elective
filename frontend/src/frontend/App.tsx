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

function Frontend() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about">
          <Route index element={<About />} />
          <Route path="profile" element={<About />} />
          <Route path="administration" element={<About />} />
          <Route path="offices" element={<About />} />
          <Route path="contact" element={<About />} />
        </Route>
        <Route path="/academic">
          <Route index element={<Academics location="colleges" />} />
          <Route path="colleges" element={<Academics location="colleges" />} />
          <Route path="graduate" element={<Academics location="graduate" />} />
          <Route path="calendar" element={<Academics location="calendar" />} />
          <Route path="obe" element={<Academics location="obe" />} />
        </Route>
        <Route path="/admission">
          <Route index element={<Admission location="PLMAT" />} />
          <Route path="PLMAT" element={<Admission location="PLMAT" />} />
          <Route path="CMAT" element={<Admission location="CMAT" />} />
          <Route path="CLAT" element={<Admission location="CLAT" />} />
        </Route>
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/bids-and-awards" element={<Bids />} />
      </Routes>
      <Footer />
    </>
  )
}

export default Frontend
