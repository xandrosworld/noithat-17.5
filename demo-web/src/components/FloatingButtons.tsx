import { useState, useEffect } from 'react';

const FloatingButtons = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 20, zIndex: 900, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
      {/* Phone */}
      <a href="tel:0975097777" title="Gọi 0975.09.7777" style={{
        width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center',
        justifyContent: 'center', backgroundColor: '#16a34a', textDecoration: 'none',
        animation: 'pulse-phone 2s infinite', transition: 'transform 0.2s', cursor: 'pointer',
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseLeave={e => e.currentTarget.style.transform = ''}
      >
        <svg width="28" height="28" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.96.35 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.56 2.81.68a2 2 0 011.72 2.04z" fill="#fff"/></svg>
      </a>

      {/* Zalo */}
      <a href="https://zalo.me/0975097777" target="_blank" rel="noopener noreferrer" title="Chat Zalo" style={{
        width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center',
        justifyContent: 'center', backgroundColor: '#0068FF', textDecoration: 'none',
        boxShadow: '0 4px 20px rgba(0,104,255,0.4)', transition: 'transform 0.2s', cursor: 'pointer',
        color: '#fff', fontSize: 17, fontWeight: 900, fontFamily: 'Arial Black, Arial, sans-serif',
        letterSpacing: -0.5,
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseLeave={e => e.currentTarget.style.transform = ''}
      >Zalo</a>

      {/* Scroll top */}
      {show && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Lên đầu trang" style={{
          width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center',
          justifyContent: 'center', backgroundColor: '#E8913A', color: '#fff', border: 'none',
          cursor: 'pointer', boxShadow: '0 4px 16px rgba(232,145,58,0.4)', transition: 'transform 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 19V5M5 12l7-7 7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}

      <style>{`@keyframes pulse-phone{0%{box-shadow:0 0 0 0 rgba(22,163,74,0.5)}70%{box-shadow:0 0 0 16px rgba(22,163,74,0)}100%{box-shadow:0 0 0 0 rgba(22,163,74,0)}}`}</style>
    </div>
  );
};

export default FloatingButtons;
