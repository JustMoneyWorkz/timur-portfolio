import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

function AdminHero() {
  const [heroData, setHeroData] = useState(portfolioData.hero);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // В будущем здесь будет отправка на сервер
    portfolioData.hero = heroData;
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    window.dispatchEvent(new Event('portfolioDataUpdated'));
  };

  const handleBadgeChange = (value) => {
    const badges = value.split(',').map(b => b.trim()).filter(b => b);
    setHeroData({ ...heroData, badges });
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...heroData.stats];
    newStats[index] = { ...newStats[index], [field]: field === 'number' ? parseInt(value) || 0 : value };
    setHeroData({ ...heroData, stats: newStats });
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
        Редактирование главной секции
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Name */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '8px'
          }}>
            Заголовок
          </label>
          <input
            type="text"
            value={heroData.name}
            onChange={(e) => setHeroData({ ...heroData, name: e.target.value })}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '15px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              outline: 'none',
              transition: 'border-color 0.3s ease',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        {/* Subtitle */}
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
          <textarea
            value={heroData.subtitle}
            onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
            rows={4}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '15px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              outline: 'none',
              transition: 'border-color 0.3s ease',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        {/* Stats */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '12px'
          }}>
            Статистика
          </label>
          {heroData.stats.map((stat, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <input
                type="number"
                value={stat.number}
                onChange={(e) => handleStatChange(index, 'number', e.target.value)}
                placeholder="Число"
                style={{
                  padding: '12px 16px',
                  fontSize: '15px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                placeholder="Описание"
                style={{
                  padding: '12px 16px',
                  fontSize: '15px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          ))}
        </div>

        {/* Badges */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '8px'
          }}>
            Технологии (через запятую)
          </label>
          <textarea
            value={heroData.badges.join(', ')}
            onChange={(e) => handleBadgeChange(e.target.value)}
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

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="btn btn-primary"
          style={{
            padding: '14px 32px',
            fontSize: '16px',
            alignSelf: 'flex-start',
            position: 'relative'
          }}
        >
          {saved ? '✓ Сохранено!' : 'Сохранить изменения'}
        </button>
      </div>
    </div>
  );
}

export default AdminHero;
