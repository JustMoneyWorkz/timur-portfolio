function Modal({ project, closeModal }) {
  if (!project) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      id="modal"
      className={`modal ${project ? 'active' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className="modal-content">
        <button className="modal-close" onClick={closeModal}>
          ×
        </button>

        <div id="modal-body">
          <h2>{project.title}</h2>

          <div className="modal-section">
            <h3>ПРОБЛЕМА</h3>
            <p>{project.problem}</p>
          </div>

          <div className="modal-section">
            <h3>РЕШЕНИЕ</h3>
            <p>{project.solution}</p>
          </div>

          <div className="modal-section">
            <h3>ТЕХНОЛОГИИ</h3>
            <div className="modal-badges">
              {project.technologies.map((tech, i) => (
                <span key={i} className="badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3>ФУНКЦИИ</h3>
            <ul>
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h3>РЕЗУЛЬТАТ</h3>
            <p>{project.result}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
