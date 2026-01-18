import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GridBackground from './components/GridBackground'
import Cursor from './components/Cursor'
import ProgressBar from './components/ProgressBar'
import ScrollTop from './components/ScrollTop'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SectionDivider from './components/SectionDivider'
import About from './components/About'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Modal from './components/Modal'
import AdminLogin from './admin/AdminLogin'
import AdminPanel from './admin/AdminPanel'

function MainSite() {
  const [modalProject, setModalProject] = useState(null);

  useEffect(() => {
    // Remove loading line after page loads
    const loadingLine = document.querySelector('.loading-line');
    if (loadingLine) {
      setTimeout(() => {
        loadingLine.style.display = 'none';
      }, 1500);
    }

    // Scroll Animations
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    document.querySelectorAll('.fade-in').forEach((el) => {
      scrollObserver.observe(el);
    });

    return () => scrollObserver.disconnect();
  }, []);

  const openModal = (project) => {
    setModalProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Loading Animation */}
      <div className="loading-line"></div>

      {/* Animated Grid Background */}
      <GridBackground />

      <div className="main-content">
        {/* Custom Cursor */}
        <Cursor />

        {/* Progress Bar */}
        <ProgressBar />

        {/* Scroll to Top */}
        <ScrollTop />

        {/* Navigation */}
        <Navbar />

        {/* Hero */}
        <Hero />

        <SectionDivider />

        {/* About */}
        <About />

        <SectionDivider />

        {/* Projects */}
        <Projects openModal={openModal} />

        <SectionDivider />

        {/* Testimonials */}
        <Testimonials />

        {/* Footer */}
        <Footer />
      </div>

      {/* Modal */}
      <Modal project={modalProject} closeModal={closeModal} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
