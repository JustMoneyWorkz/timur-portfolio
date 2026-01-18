import { useState } from 'react';

function Testimonials() {
  const testimonials = [
    {
      name: 'Алексей Иванов',
      role: 'CEO',
      company: 'TechStart',
      text: 'Работать с Тимуром было одно удовольствие! Он выполнил наш VPN-проект досрочно с исключительным качеством. Код чистый, хорошо документирован, а архитектура продумана. Его внимание к деталям и проактивная коммуникация сделали весь процесс гладким.',
    },
    {
      name: 'Мария Петрова',
      role: 'Product Manager',
      company: 'Digital Agency',
      text: 'Тимур продемонстрировал выдающийся профессионализм на протяжении всего нашего e-commerce проекта. Он быстро понял наши требования, предложил оптимальные решения и реализовал все идеально. Платформа превзошла наши ожидания.',
    },
    {
      name: 'Дмитрий Смирнов',
      role: 'CTO',
      company: 'GameDev Studio',
      text: 'Наш проект Telegram игрового бота требовал глубокой технической экспертизы. Тимур оказался идеальным выбором. Он справился со сложными игровыми механиками, оптимизировал производительность базы данных и создал захватывающий пользовательский опыт.',
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handlePrev = () => {
    setCurrentTestimonial(
      (currentTestimonial - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setCurrentTestimonial((currentTestimonial + 1) % testimonials.length);
  };

  const t = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="fade-in">
      <h2>Отзывы</h2>
      <p className="section-subtitle">Что говорят клиенты о работе со мной</p>

      <div className="testimonial-box">
        <div id="testimonial-content">
          <div className="testimonial-quote">{t.text}</div>
          <div className="testimonial-author">
            <div className="testimonial-avatar">{t.name[0]}</div>
            <div className="testimonial-info">
              <h4>{t.name}</h4>
              <p>
                {t.role} — {t.company}
              </p>
            </div>
          </div>
        </div>

        <div className="testimonial-nav">
          <button id="prev" onClick={handlePrev}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button id="next" onClick={handleNext}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
