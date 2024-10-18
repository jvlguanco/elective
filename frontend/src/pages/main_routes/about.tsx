import { Routes, Route } from 'react-router-dom';

const About = () => {
    return (
        <Routes>
      <Route path="profile" element={<div>Profile</div>} />
      <Route path="administration" element={<div>Admin</div>} />
      <Route path="offices" element={<div>Offices</div>} />
      <Route path="contact" element={<div>Contact</div>} />
    </Routes>
    )
}

export default About;