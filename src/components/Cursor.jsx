import { useEffect, useRef } from 'react';

function Cursor() {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    let mouseX = 0,
      mouseY = 0;
    let cursorX = 0,
      cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      cursorDot.style.left = cursorX + 'px';
      cursorDot.style.top = cursorY + 'px';

      cursorOutline.style.left = cursorX + 'px';
      cursorOutline.style.top = cursorY + 'px';

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll('a, button, .card, .badge, .nav-logo').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hover');
      });

      el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hover');
      });
    });
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot"></div>
      <div ref={cursorOutlineRef} className="cursor-outline"></div>
    </>
  );
}

export default Cursor;
