import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHero from './AdminHero';
import AdminAbout from './AdminAbout';
import AdminProjects from './AdminProjects';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('hero');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          animation: 'fadeInUp 0.6s ease'
        }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '8px'
            }}>
              Админ-панель
            </h1>
            <p style={{ color: '#666', fontSize: '15px' }}>
              Управление контентом портфолио
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => navigate('/')}
              className="btn btn-secondary"
              style={{ padding: '12px 24px' }}
            >
              На сайт
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '12px 24px',
                background: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.background = '#dc2626'}
              onMouseOut={(e) => e.target.style.background = '#ef4444'}
            >
              Выйти
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '32px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          animation: 'fadeInUp 0.6s ease 0.1s backwards'
        }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            {['hero', 'about', 'projects'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 28px',
                  background: activeTab === tab
                    ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
                    : '#f9fafb',
                  color: activeTab === tab ? '#fff' : '#666',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab) {
                    e.target.style.background = '#e5e7eb';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab) {
                    e.target.style.background = '#f9fafb';
                  }
                }}
              >
                {tab === 'hero' && '🏠 Главная'}
                {tab === 'about' && '👤 Обо мне'}
                {tab === 'projects' && '💼 Проекты'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{
          animation: 'fadeInUp 0.6s ease 0.2s backwards'
        }}>
          {activeTab === 'hero' && <AdminHero />}
          {activeTab === 'about' && <AdminAbout />}
          {activeTab === 'projects' && <AdminProjects />}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default AdminPanel;
