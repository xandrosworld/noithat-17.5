import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const PHONE = '0975.09.7777';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Về 4U Home', path: '/ve-chung-toi' },
    { label: 'Dịch vụ', path: '/dich-vu', children: [
      { label: 'Thiết kế nội thất', path: '/dich-vu' },
      { label: 'Thi công nội thất', path: '/dich-vu' },
      { label: 'Nội thất trọn gói', path: '/dich-vu' },
      { label: 'Cải tạo không gian', path: '/dich-vu' },
    ]},
    { label: 'Dự án', path: '/du-an' },
    { label: 'Tin tức', path: '/tin-tuc' },
    { label: 'Liên hệ', path: '/lien-he' },
  ];

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: 90,
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        zIndex: 1000,
        borderBottom: isScrolled ? '1px solid #e5e7eb' : '1px solid transparent',
        boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <div style={{
          maxWidth: 1320, margin: '0 auto', padding: '0 40px', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link to="/" style={{ flexShrink: 0, zIndex: 1001 }}>
            <img src="/assets/LOGO-01 PNG.png" alt="4U Home"
              style={{ height: 70, objectFit: 'contain' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
            {navItems.map((item) => (
              <div key={item.path} style={{ position: 'relative' }} className="nav-item-wrapper">
                <Link to={item.path} style={{
                  fontSize: 14, fontWeight: 500,
                  color: location.pathname === item.path ? '#C8A55C' : '#1F2937',
                  textTransform: 'uppercase', letterSpacing: '1.5px',
                  transition: 'color 0.3s ease',
                  display: 'flex', alignItems: 'center', gap: 4, padding: '8px 0',
                  borderBottom: location.pathname === item.path ? '2px solid #C8A55C' : '2px solid transparent',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#C8A55C'}
                  onMouseLeave={e => { if (location.pathname !== item.path) e.currentTarget.style.color = '#1F2937'; }}
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} />}
                </Link>
                {item.children && (
                  <div className="nav-dropdown" style={{
                    position: 'absolute', top: '100%', left: -16, minWidth: 220,
                    backgroundColor: '#fff', boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                    borderRadius: 8, padding: '12px 0',
                    opacity: 0, visibility: 'hidden', transform: 'translateY(8px)',
                    transition: 'all 0.25s ease', zIndex: 1002,
                  }}>
                    {item.children.map((child, idx) => (
                      <Link key={idx} to={child.path} style={{
                        display: 'block', padding: '10px 24px', fontSize: 14,
                        color: '#374151', transition: 'all 0.2s ease',
                        letterSpacing: 0, textTransform: 'none',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f9f5ed'; e.currentTarget.style.color = '#C8A55C'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#374151'; }}
                      >{child.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <a href={`tel:${PHONE.replace(/\./g,'')}`} className="header-cta" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 24px', backgroundColor: '#C8A55C', color: '#fff',
            fontSize: 13, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase',
            borderRadius: 4, transition: 'all 0.3s ease', whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1F2937'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#C8A55C'}
          >
            <Phone size={16} /> Tư vấn ngay
          </a>

          <button className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', zIndex: 1001, color: '#1F2937', padding: 8 }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#FFFFFF',
        zIndex: 998,
        display: 'flex', flexDirection: 'column',
        paddingTop: 90, paddingLeft: 32, paddingRight: 32, paddingBottom: 32,
        overflowY: 'auto',
        transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform',
      }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: 20, fontWeight: 600, color: location.pathname === item.path ? '#C8A55C' : '#1F2937',
                padding: '18px 0', borderBottom: '1px solid #F3F4F6', transition: 'color 0.2s',
              }}
            >{item.label}</Link>
          ))}
          <Link to="/admin" onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: 16, fontWeight: 500, color: '#9CA3AF', padding: '18px 0', borderBottom: '1px solid #F3F4F6' }}
          >Admin Demo</Link>
        </nav>
        <div style={{ paddingTop: 24 }}>
          <a href={`tel:${PHONE.replace(/\./g,'')}`} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            padding: '18px 32px', backgroundColor: '#C8A55C', color: '#fff',
            fontSize: 16, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase',
            borderRadius: 8, width: '100%',
          }}>
            <Phone size={20} /> Gọi: {PHONE}
          </a>
        </div>
      </div>

      <style>{`
        .nav-item-wrapper:hover .nav-dropdown {
          opacity: 1 !important; visibility: visible !important; transform: translateY(0) !important;
        }
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .header-cta { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default Header;
