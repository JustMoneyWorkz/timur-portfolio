import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const ADMIN_PASSWORD = 'timur2026'; // Измени на свой пароль

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin/panel');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        padding: '48px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
        animation: 'fadeInUp 0.6s ease'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          boxShadow: '0 8px 16px rgba(96, 165, 250, 0.3)'
        }}>
          <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '8px',
          color: '#1a1a1a'
        }}>
          Админ-панель
        </h2>

        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '32px',
          fontSize: '15px'
        }}>
          Введите пароль для доступа
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            style={{
              width: '100%',
              padding: '14px 20px',
              fontSize: '15px',
              border: error ? '2px solid #ef4444' : '2px solid #e5e7eb',
              borderRadius: '12px',
              marginBottom: '20px',
              outline: 'none',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
            onBlur={(e) => e.target.style.borderColor = error ? '#ef4444' : '#e5e7eb'}
          />

          {error && (
            <p style={{
              color: '#ef4444',
              fontSize: '14px',
              marginBottom: '16px',
              animation: 'shake 0.5s ease'
            }}>
              Неверный пароль!
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Войти
          </button>
        </form>
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

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}

export default AdminLogin;
