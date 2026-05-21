import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

const S = { accent: '#C8A55C', primary: '#1F2937', muted: '#6B7280', font: "'Be Vietnam Pro', sans-serif" };

const Contact = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setFormStatus('submitting'); setTimeout(() => setFormStatus('success'), 1500); };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', border: '1px solid #E5E7EB', borderRadius: 8,
    fontSize: 15, outline: 'none', transition: 'border-color 0.3s', fontFamily: "'Be Vietnam Pro', sans-serif",
  };

  return (
    <div>
      {/* Header */}
      <section style={{ position: 'relative', padding: '80px 0 60px', overflow: 'hidden', backgroundColor: S.primary }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08 }}>
          <img src="/assets/generated/project_office_modern.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <p style={{ color: S.accent, textTransform: 'uppercase', letterSpacing: 3, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Kết nối với chúng tôi</p>
          <h1 style={{ fontFamily: S.font, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#fff', marginBottom: 16 }}>Liên Hệ 4U HOME</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 600, margin: '0 auto', fontSize: 16 }}>
            Hãy để chúng tôi lắng nghe ý tưởng của bạn và biến nó thành không gian sống hoàn hảo.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64 }} className="contact-grid">
            {/* Info */}
            <div>
              <h2 style={{ fontFamily: S.font, fontSize: 28, color: S.primary, marginBottom: 16 }}>Thông Tin Liên Hệ</h2>
              <p style={{ color: S.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 40 }}>
                Liên hệ trực tiếp qua hotline, email hoặc đến showroom để trải nghiệm không gian mẫu và nhận tư vấn chi tiết.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {[
                  { icon: <MapPin size={22} />, title: 'Trụ sở & Showroom', text: 'Tầng 15, Tòa nhà Premium, 123 Đường Trần Hưng Đạo, Q.1, TP.HCM' },
                  { icon: <Phone size={22} />, title: 'Hotline Tư Vấn', text: '0975.09.7777', sub: '(Hỗ trợ 24/7 qua Zalo/Viber)' },
                  { icon: <Mail size={22} />, title: 'Email', text: 'contact@4uhome.vn' },
                  { icon: <Clock size={22} />, title: 'Giờ Làm Việc', text: 'Thứ 2 - Thứ 7: 08:00 - 18:00' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: '#F9F5ED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: S.accent, flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 15, fontWeight: 600, color: S.primary, marginBottom: 4 }}>{item.title}</h4>
                      <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.6 }}>{item.text}</p>
                      {item.sub && <p style={{ color: S.muted, fontSize: 12 }}>{item.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div style={{ backgroundColor: '#FAFAF7', padding: 40, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontFamily: S.font, fontSize: 24, color: S.primary, marginBottom: 28 }}>Gửi Yêu Cầu Tư Vấn</h3>
              {formStatus === 'success' ? (
                <div className="fade-in" style={{ textAlign: 'center', padding: '48px 24px' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: '#DEF7EC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <CheckCircle size={36} style={{ color: '#059669' }} />
                  </div>
                  <h4 style={{ fontSize: 22, fontFamily: S.font, color: '#065F46', marginBottom: 8 }}>Gửi Thành Công!</h4>
                  <p style={{ color: '#6B7280', marginBottom: 24 }}>Đội ngũ 4U HOME sẽ liên hệ lại trong thời gian sớm nhất.</p>
                  <button onClick={() => setFormStatus('idle')} style={{
                    padding: '12px 28px', border: '2px solid #059669', color: '#059669',
                    fontSize: 13, fontWeight: 600, borderRadius: 6, cursor: 'pointer', background: 'transparent',
                    transition: 'all 0.3s',
                  }}>Gửi yêu cầu khác</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: S.primary }}>Họ và tên *</label>
                    <input required type="text" placeholder="Nhập họ tên" style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = S.accent} onBlur={e => e.currentTarget.style.borderColor = '#E5E7EB'} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: S.primary }}>Số điện thoại *</label>
                      <input required type="tel" placeholder="0901234567" style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = S.accent} onBlur={e => e.currentTarget.style.borderColor = '#E5E7EB'} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: S.primary }}>Email</label>
                      <input type="email" placeholder="email@example.com" style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = S.accent} onBlur={e => e.currentTarget.style.borderColor = '#E5E7EB'} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: S.primary }}>Loại công trình</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option>Căn hộ chung cư</option><option>Nhà phố / Liền kề</option>
                      <option>Biệt thự</option><option>Văn phòng / Showroom</option><option>Khác</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: S.primary }}>Nội dung yêu cầu</label>
                    <textarea rows={4} placeholder="Mô tả sơ bộ về diện tích, phong cách yêu thích..." style={{ ...inputStyle, resize: 'vertical' }} onFocus={e => e.currentTarget.style.borderColor = S.accent} onBlur={e => e.currentTarget.style.borderColor = '#E5E7EB'} />
                  </div>
                  <button type="submit" disabled={formStatus === 'submitting'} style={{
                    width: '100%', padding: '16px', backgroundColor: S.accent, color: '#fff',
                    fontSize: 14, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
                    borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'background 0.3s',
                    opacity: formStatus === 'submitting' ? 0.7 : 1,
                  }}>{formStatus === 'submitting' ? 'Đang gửi...' : 'Gửi Yêu Cầu'}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section style={{ height: 400, position: 'relative', backgroundColor: '#E5E7EB' }}>
        <img src="/assets/generated/project_villa_exterior.png" alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(80%) brightness(0.7)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '16px 28px', borderRadius: 12, boxShadow: '0 8px 30px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <MapPin style={{ color: S.accent }} size={22} />
            <span style={{ fontWeight: 600, color: S.primary, fontSize: 15 }}>Văn phòng 4U HOME — Q.1, TP.HCM</span>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
};

export default Contact;
