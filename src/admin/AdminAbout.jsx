import { useState } from 'react';
import { portfolioData } from '../data/portfolioData';

function AdminAbout() {
  const [aboutData, setAboutData] = useState(portfolioData.about);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    portfolioData.about = aboutData;
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    window.dispatchEvent(new Event('portfolioDataUpdated'));
  };

  const handleSkillsChange = (value) => {
    const skills = value.split(',').map(s => s.trim()).filter(s => s);
    setAboutData({ ...aboutData, skills });
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        fontSize: '28px',
        fontWeight: '700',
        marginBottom: '32px',
        color: '#1a1a1a'
      }}>
        Редактирование секции "Обо мне"
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '8px'
          }}>
            Заголовок секции
          </label>
          <input
            type="text"
            value={aboutData.title}
            onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '15px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '8px'
          }}>
            Подзаголовок
          </label>
          <input
            type="text"
            value={aboutData.subtitle}
            onChange={(e) => setAboutData({ ...aboutData, subtitle: e.target.value })}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '15px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '8px'
          }}>
            Имя
          </label>
          <input
            type="text"
            value={aboutData.name}
            onChange={(e) => setAboutData({ ...aboutData, name: e.target.value })}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '15px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '8px'
          }}>
            Описание
          </label>
          <textarea
            value={aboutData.description}
            onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
            rows={6}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '15px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              outline: 'none',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '8px'
          }}>
            Навыки (через запятую)
          </label>
          <textarea
            value={aboutData.skills.join(', ')}
            onChange={(e) => handleSkillsChange(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '15px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              outline: 'none',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          onClick={handleSave}
          className="btn btn-primary"
          style={{
            padding: '14px 32px',
            fontSize: '16px',
            alignSelf: 'flex-start'
          }}
        >
          {saved ? '✓ Сохранено!' : 'Сохранить изменения'}
        </button>
      </div>
    </div>
  );
}

export default AdminAbout;
