import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

function About() {
  const [data, setData] = useState(portfolioData.about);

  useEffect(() => {
    const handleDataUpdate = () => {
      const savedData = localStorage.getItem('portfolioData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setData(parsed.about);
      }
    };

    window.addEventListener('portfolioDataUpdated', handleDataUpdate);
    handleDataUpdate();

    return () => {
      window.removeEventListener('portfolioDataUpdated', handleDataUpdate);
    };
  }, []);

  return (
    <section id="about" className="fade-in">
      <h2>{data.title}</h2>
      <p className="section-subtitle">
        {data.subtitle}
      </p>

      <div className="profile-container">
        <div className="profile-avatar">{data.name[0]}</div>
        <div className="profile-content">
          <h3>{data.name}</h3>
          <p>
            {data.description}
          </p>

          <div className="profile-skills">
            {data.skills.map((skill, index) => (
              <span key={index} className="badge">{skill}</span>
            ))}
          </div>

          <div className="profile-contacts">
            <a href="https://kwork.ru/user/crackdev" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', transition: 'all 0.2s ease', cursor: 'pointer' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12l10 5 10-5" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Kwork</span>
              </div>
            </a>

            <a href="https://t.me/multihatred" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', transition: 'all 0.2s ease', cursor: 'pointer' }}>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" 
                  alt="Telegram" 
                  width="20" 
                  height="20"
                  style={{ display: 'block' }}
                />
                <span>Telegram</span>
              </div>
            </a>

            <a href="https://github.com/JustMoneyWorkz" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', transition: 'all 0.2s ease', cursor: 'pointer' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a1a1a">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
