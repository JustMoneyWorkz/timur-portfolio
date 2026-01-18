import { useEffect, useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('nav');
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleLinkClick = (href) => {
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  return (
    <>
      <nav id="nav">
        <div className="nav-container">
          <div className="nav-logo" onClick={scrollToTop}>
            Тимур
          </div>

          {/* Desktop Menu */}
          <div className="nav-menu nav-menu-desktop">
            <a href="#hero" className="nav-link" onClick={(e) => { e.preventDefault(); handleLinkClick('#hero'); }}>
              Главная
            </a>
            <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); handleLinkClick('#about'); }}>
              Обо мне
            </a>
            <a href="#projects" className="nav-link" onClick={(e) => { e.preventDefault(); handleLinkClick('#projects'); }}>
              Проекты
            </a>
            <a href="#testimonials" className="nav-link" onClick={(e) => { e.preventDefault(); handleLinkClick('#testimonials'); }}>
              Отзывы
            </a>
            <button className="btn btn-primary">Связаться</button>
          </div>

          {/* Mobile Burger Button */}
          <button className="burger-btn" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={menuOpen ? 'active' : ''}></span>
            <span className={menuOpen ? 'active' : ''}></span>
            <span className={menuOpen ? 'active' : ''}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div className={`mobile-overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)}></div>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${menuOpen ? 'active' : ''}`}>
        <div className="mobile-sidebar-header">
          <div className="nav-logo">Тимур</div>
          <button className="mobile-close-btn" onClick={() => setMenuOpen(false)}>
            ×
          </button>
        </div>

        <div className="mobile-sidebar-links">
          <a href="#hero" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); handleLinkClick('#hero'); }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Главная
          </a>
          <a href="#about" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); handleLinkClick('#about'); }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Обо мне
          </a>
          <a href="#projects" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); handleLinkClick('#projects'); }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            Проекты
          </a>
          <a href="#testimonials" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); handleLinkClick('#testimonials'); }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Отзывы
          </a>
        </div>

        <div className="mobile-sidebar-footer">
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setMenuOpen(false)}>
            Связаться
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
