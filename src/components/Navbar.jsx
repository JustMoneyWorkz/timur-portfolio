import { useEffect } from 'react';

function Navbar() {
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
  };

  return (
    <nav id="nav">
      <div className="nav-container">
        <div className="nav-logo" onClick={scrollToTop}>
          Тимур
        </div>
        <div className="nav-menu">
          <a href="#hero" className="nav-link">
            Главная
          </a>
          <a href="#about" className="nav-link">
            Обо мне
          </a>
          <a href="#projects" className="nav-link">
            Проекты
          </a>
          <a href="#testimonials" className="nav-link">
            Отзывы
          </a>
          <button className="btn btn-primary">Связаться</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
