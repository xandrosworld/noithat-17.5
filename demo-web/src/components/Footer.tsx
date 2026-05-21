import { Link } from 'react-router-dom';

const C = { teal: '#0D3B2E', tl: '#0a2e22', gold: '#C8A55C', or: '#E8913A' };

const Footer = () => (
  <footer style={{ backgroundColor: C.tl, color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
    <div style={{ maxWidth: 1320, margin: '0 auto', padding: '64px 40px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.3fr', gap: 48 }} className="footer-grid">
        {/* Brand */}
        <div>
          <img src="/assets/LOGO-02 PNG.png" alt="4U Home" style={{ height: 100, objectFit: 'contain', marginBottom: 20 }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <p style={{ lineHeight: 1.7, marginBottom: 20 }}>Kiến tạo không gian sống đẳng cấp, mang đậm dấu ấn cá nhân. 4U Home tự hào là đơn vị thiết kế & thi công nội thất hàng đầu.</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {['F', 'I', 'Y'].map(s => (
              <a key={s} href="#" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 700, transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >{s}</a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 20, letterSpacing: 0.5 }}>DỊCH VỤ</h4>
          {['Thiết kế nội thất', 'Thi công nội thất', 'Nội thất trọn gói', 'Cải tạo không gian', 'Tư vấn phong thủy'].map(s => (
            <Link key={s} to="/dich-vu" style={{ display: 'block', color: 'rgba(255,255,255,0.55)', marginBottom: 12, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = C.gold}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >{s}</Link>
          ))}
        </div>

        {/* Projects */}
        <div>
          <h4 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 20, letterSpacing: 0.5 }}>DỰ ÁN</h4>
          {['Nội thất Biệt Thự', 'Nội thất Nhà Phố', 'Nội thất Căn Hộ', 'Văn phòng / Showroom', 'Nhà hàng / Khách sạn'].map(s => (
            <Link key={s} to="/du-an" style={{ display: 'block', color: 'rgba(255,255,255,0.55)', marginBottom: 12, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = C.gold}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >{s}</Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 20, letterSpacing: 0.5 }}>LIÊN HỆ</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{flexShrink:0,marginTop:2}}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#C8A55C"/><circle cx="12" cy="9" r="2.5" fill="#0a2e22"/></svg>
              <span>Tầng 15, Tòa nhà Premium, 123 Đường Trần Hưng Đạo, Q.1, TP.HCM</span>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.96.35 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.56 2.81.68a2 2 0 011.72 2.04z" fill="#C8A55C"/></svg>
              <a href="tel:0975097777" style={{ color: C.gold, fontWeight: 700, fontSize: 16 }}>0975.09.7777</a>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{flexShrink:0}}><rect x="2" y="4" width="20" height="16" rx="3" fill="#C8A55C"/><path d="M2 7l10 6 10-6" stroke="#0a2e22" strokeWidth="2"/></svg>
              <span>contact@4uhome.vn</span>
            </div>
          </div>
          <Link to="/lien-he" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            marginTop: 24, padding: '12px 28px', border: `2px solid ${C.or}`, borderRadius: 6,
            color: C.or, fontWeight: 700, fontSize: 13, letterSpacing: 0.5, transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.or; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.or; }}
          >NHẬN BÁO GIÁ →</Link>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 40px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
        <span>© 2026 4U HOME — Luxury Interior Design. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = C.gold} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>Chính sách bảo mật</a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = C.gold} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>Điều khoản sử dụng</a>
        </div>
      </div>
    </div>

    <style>{`
      @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
      @media (max-width: 640px) { .footer-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </footer>
);

export default Footer;
