import { useEffect, useState } from 'react';
import { portfolioData } from '../data/portfolioData';

function Hero() {
  const [data, setData] = useState(portfolioData.hero);

  useEffect(() => {
    // Listen for data updates from admin
    const handleDataUpdate = () => {
      const savedData = localStorage.getItem('portfolioData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setData(parsed.hero);
      }
    };

    window.addEventListener('portfolioDataUpdated', handleDataUpdate);

    // Check localStorage on mount
    handleDataUpdate();

    // Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    let counted = false;

    const countUp = (el) => {
      const target = +el.getAttribute('data-target');
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target + '+';
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current) + '+';
        }
      }, 16);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted) {
            counters.forEach((counter) => countUp(counter));
            counted = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      counterObserver.observe(statsSection);
    }

    return () => {
      window.removeEventListener('portfolioDataUpdated', handleDataUpdate);
      counterObserver.disconnect();
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-floating-badge">
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="8" cy="8" r="7" />
          <path d="M8 4v4l3 3" />
        </svg>
        Доступен для проектов
      </div>

      <h1>{data.name}</h1>

      <p className="hero-subtitle">
        {data.subtitle}
      </p>

      <div className="hero-actions">
        <button className="btn btn-primary" onClick={scrollToProjects}>
          Мои проекты
        </button>
        <a href="https://t.me/multihatred" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          Написать
        </a>
      </div>

      <div className="stats">
        {data.stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <span className="stat-number" data-target={stat.number}>
              0+
            </span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="badges">
        {data.badges.map((badge, index) => (
          <span key={index} className="badge">{badge}</span>
        ))}
      </div>
    </section>
  );
}

export default Hero;
