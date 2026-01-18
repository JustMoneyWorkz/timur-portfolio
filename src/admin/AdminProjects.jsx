import { useState } from 'react';
import { portfolioData, iconsList } from '../data/portfolioData';

function AdminProjects() {
  const [projects, setProjects] = useState(portfolioData.projects);
  const [editingProject, setEditingProject] = useState(null);
  const [saved, setSaved] = useState(false);

  const getIconSvg = (iconName) => {
    const icons = {
      layers: <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></>,
      shopping: <><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></>,
      gamepad: <><rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></>,
      code: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
      database: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>,
      mobile: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></>,
      server: <><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></>,
      chart: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>,
      globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
      rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /></>,
      settings: <><circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v6m5.196-14.196l-4.243 4.243m-5.657 5.657l-4.243 4.243m16.97-.707l-4.243-4.243M5.196 7.804L.953 3.561" /></>,
      shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
      star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></>,
      tool: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></>,
      message: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>,
      mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
      bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
      camera: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>,
      heart: <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></>,
      lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    };
    return icons[iconName] || icons.layers;
  };

  const handleSave = () => {
    portfolioData.projects = projects;
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    window.dispatchEvent(new Event('portfolioDataUpdated'));
  };

  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      title: 'Новый проект',
      icon: 'layers',
      problem: '',
      solution: '',
      technologies: [],
      result: '',
      features: []
    };
    setEditingProject(newProject);
  };

  const handleEditProject = (project) => {
    setEditingProject({ ...project });
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Удалить этот проект?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleSaveProject = () => {
    if (projects.find(p => p.id === editingProject.id)) {
      setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
    } else {
      setProjects([...projects, editingProject]);
    }
    setEditingProject(null);
  };

  const handleTechChange = (value) => {
    const techs = value.split(',').map(t => t.trim()).filter(t => t);
    setEditingProject({ ...editingProject, technologies: techs });
  };

  const handleFeaturesChange = (value) => {
    const feats = value.split('\n').filter(f => f.trim());
    setEditingProject({ ...editingProject, features: feats });
  };

  if (editingProject) {
    return (
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a' }}>
            {projects.find(p => p.id === editingProject.id) ? 'Редактирование проекта' : 'Новый проект'}
          </h2>
          <button
            onClick={() => setEditingProject(null)}
            style={{
              padding: '10px 20px',
              background: '#f9fafb',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ← Назад
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
              Название проекта
            </label>
            <input
              type="text"
              value={editingProject.title}
              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
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
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '12px' }}>
              Выбор иконки
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '12px' }}>
              {iconsList.map((icon) => (
                <div
                  key={icon.name}
                  onClick={() => setEditingProject({ ...editingProject, icon: icon.name })}
                  style={{
                    padding: '16px',
                    border: editingProject.icon === icon.name ? '3px solid #60a5fa' : '2px solid #e5e7eb',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: editingProject.icon === icon.name ? 'rgba(96, 165, 250, 0.1)' : '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={editingProject.icon === icon.name ? '#60a5fa' : '#666'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {getIconSvg(icon.name)}
                  </svg>
                  <span style={{ fontSize: '11px', color: '#666', textAlign: 'center' }}>{icon.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
              Проблема
            </label>
            <textarea
              value={editingProject.problem}
              onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
              rows={4}
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
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
              Решение
            </label>
            <textarea
              value={editingProject.solution}
              onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
              rows={4}
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
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
              Технологии (через запятую)
            </label>
            <textarea
              value={editingProject.technologies.join(', ')}
              onChange={(e) => handleTechChange(e.target.value)}
              rows={2}
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
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
              Результат
            </label>
            <textarea
              value={editingProject.result}
              onChange={(e) => setEditingProject({ ...editingProject, result: e.target.value })}
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

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
              Функции (каждая с новой строки)
            </label>
            <textarea
              value={editingProject.features.join('\n')}
              onChange={(e) => handleFeaturesChange(e.target.value)}
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

          <button
            onClick={handleSaveProject}
            className="btn btn-primary"
            style={{ padding: '14px 32px', fontSize: '16px', alignSelf: 'flex-start' }}
          >
            Сохранить проект
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a' }}>
          Управление проектами
        </h2>
        <button
          onClick={handleAddProject}
          className="btn btn-primary"
          style={{ padding: '12px 24px' }}
        >
          + Добавить проект
        </button>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              padding: '24px',
              border: '2px solid #e5e7eb',
              borderRadius: '16px',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
                  {project.title}
                </h3>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px' }}>
                  {project.problem.substring(0, 100)}...
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="badge" style={{ fontSize: '12px', padding: '6px 12px' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginLeft: '20px' }}>
                <button
                  onClick={() => handleEditProject(project)}
                  style={{
                    padding: '10px 20px',
                    background: '#60a5fa',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Изменить
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  style={{
                    padding: '10px 20px',
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length > 0 && (
        <button
          onClick={handleSave}
          className="btn btn-primary"
          style={{ padding: '14px 32px', fontSize: '16px', marginTop: '32px' }}
        >
          {saved ? '✓ Сохранено!' : 'Сохранить все изменения'}
        </button>
      )}
    </div>
  );
}

export default AdminProjects;
