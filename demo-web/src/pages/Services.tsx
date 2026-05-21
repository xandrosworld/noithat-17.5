import { useState } from 'react';
import { CheckCircle, ArrowRight, Palette, Hammer, Package, RefreshCw, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const S = { accent: '#C8A55C', primary: '#1F2937', muted: '#6B7280', font: "'Be Vietnam Pro', sans-serif" };

const Services = () => {
  const [formOk, setFormOk] = useState(false);
  return (
    <div>
      {/* Hero */}
      <section style={{ backgroundColor: S.primary, padding: '80px 0 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06 }}>
          <img src="/assets/generated/premium_kitchen_interior.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: '0 40px' }}>
          <p style={{ color: S.accent, textTransform: 'uppercase', letterSpacing: 3, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Giải pháp nội thất toàn diện</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: 16, fontWeight: 700 }}>Dịch Vụ & Báo Giá Nội Thất</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 600, margin: '0 auto', fontSize: 16 }}>
            Từ ý tưởng đến bàn giao — 4U HOME đồng hành cùng bạn trong mọi giai đoạn kiến tạo không gian sống.
          </p>
        </div>
      </section>

      {/* 4 Service Groups */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 28 }} className="services-grid">
            {serviceGroups.map((g, i) => (
              <div key={i} style={{ padding: 32, borderRadius: 12, border: '1px solid #E5E7EB', transition: 'all 0.3s', textAlign: 'center' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = S.accent; e.currentTarget.style.boxShadow = '0 8px 30px rgba(200,165,92,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#F9F5ED', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: S.accent }}>{g.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: S.primary, marginBottom: 12 }}>{g.title}</h3>
                <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{g.desc}</p>
                <ul style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {g.items.map((item, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: S.primary }}>
                      <CheckCircle size={14} style={{ color: S.accent, flexShrink: 0 }} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '80px 0', backgroundColor: '#F5F5F0' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ color: S.accent, textTransform: 'uppercase', letterSpacing: 3, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Bảng giá tham khảo</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: S.primary, fontWeight: 700 }}>Gói Dịch Vụ Thiết Kế & Thi Công</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }} className="pricing-grid">
            {packages.map((pkg, i) => (
              <div key={i} style={{
                backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden',
                border: pkg.featured ? '2px solid ' + S.accent : '1px solid #E5E7EB',
                position: 'relative', transition: 'transform 0.3s, box-shadow 0.3s',
                transform: pkg.featured ? 'scale(1.03)' : 'scale(1)',
                boxShadow: pkg.featured ? '0 16px 48px rgba(200,165,92,0.15)' : '0 2px 12px rgba(0,0,0,0.04)',
              }}>
                {pkg.featured && <div style={{ backgroundColor: S.accent, color: '#fff', textAlign: 'center', padding: '8px 0', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>Phổ biến nhất</div>}
                <div style={{ padding: 36 }}>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: S.primary, marginBottom: 8 }}>{pkg.name}</h3>
                  <p style={{ color: S.muted, fontSize: 14, marginBottom: 24, minHeight: 40 }}>{pkg.desc}</p>
                  <div style={{ marginBottom: 24 }}>
                    <span style={{ fontSize: 36, fontWeight: 800, color: S.primary }}>{pkg.price}</span>
                    <span style={{ color: S.muted, fontSize: 14 }}> /m²</span>
                  </div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                    {pkg.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: S.primary }}>
                        <CheckCircle size={16} style={{ color: S.accent, flexShrink: 0, marginTop: 2 }} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/lien-he" style={{
                    display: 'block', textAlign: 'center', padding: '14px 0', borderRadius: 8,
                    backgroundColor: pkg.featured ? S.accent : 'transparent',
                    color: pkg.featured ? '#fff' : S.primary,
                    border: pkg.featured ? 'none' : '2px solid #E5E7EB',
                    fontWeight: 600, fontSize: 14, letterSpacing: 0.5, transition: 'all 0.3s',
                  }}>Nhận báo giá chi tiết</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ color: S.accent, textTransform: 'uppercase', letterSpacing: 3, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Quy trình làm việc</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: S.primary, fontWeight: 700 }}>5 Bước Để Hoàn Thiện Tổ Ấm</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 20 }} className="process-grid">
            {steps.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: S.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 20, fontWeight: 800 }}>{i + 1}</div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: S.primary, marginBottom: 8 }}>{s.title}</h4>
                <p style={{ color: S.muted, fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
                {i < 4 && <div className="step-arrow" style={{ position: 'absolute', top: 28, right: -16, color: '#D1D5DB' }}><ArrowRight size={20} /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Lead Form */}
      <section style={{ padding: '80px 0', backgroundColor: S.primary, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
          <img src="/assets/generated/hero_interior_living_room.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, marginBottom: 16 }}>Nhận Báo Giá Miễn Phí</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 36 }}>Để lại thông tin, đội ngũ 4U HOME sẽ tư vấn và gửi báo giá chi tiết trong vòng 24h.</p>
          {formOk ? (
            <div className="fade-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 40 }}>
              <Send size={40} style={{ color: S.accent, marginBottom: 16 }} />
              <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Đã gửi thành công!</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Chúng tôi sẽ liên hệ bạn sớm nhất.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setFormOk(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input required type="text" placeholder="Họ và tên *" style={{ padding: '14px 18px', borderRadius: 8, border: 'none', fontSize: 15, outline: 'none' }} />
              <input required type="tel" placeholder="Số điện thoại *" style={{ padding: '14px 18px', borderRadius: 8, border: 'none', fontSize: 15, outline: 'none' }} />
              <select style={{ padding: '14px 18px', borderRadius: 8, border: 'none', fontSize: 15, outline: 'none', color: '#6B7280' }}>
                <option>Chọn loại công trình</option><option>Căn hộ</option><option>Nhà phố</option><option>Biệt thự</option><option>Văn phòng</option>
              </select>
              <button type="submit" style={{ padding: '16px', backgroundColor: S.accent, color: '#fff', fontSize: 15, fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer', letterSpacing: 0.5 }}>Nhận báo giá ngay</button>
            </form>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid, .pricing-grid { grid-template-columns: repeat(2,1fr) !important; }
          .process-grid { grid-template-columns: repeat(3,1fr) !important; }
          .step-arrow { display: none !important; }
        }
        @media (max-width: 640px) {
          .services-grid, .pricing-grid, .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

const serviceGroups = [
  { icon: <Palette size={28} />, title: 'Thiết Kế Nội Thất', desc: 'Lên phương án 3D chân thực, tối ưu công năng sống.', items: ['Khảo sát & tư vấn phong cách', 'Phối cảnh 3D toàn bộ căn hộ', 'Bản vẽ kỹ thuật chi tiết', 'Dự toán vật liệu đầy đủ'] },
  { icon: <Hammer size={28} />, title: 'Thi Công Nội Thất', desc: 'Sản xuất trực tiếp tại xưởng, giám sát chặt chẽ.', items: ['Xưởng sản xuất riêng', 'Đội thợ tay nghề cao', 'Bàn giao đúng cam kết', 'Bảo hành 2–5 năm'] },
  { icon: <Package size={28} />, title: 'Nội Thất Trọn Gói', desc: 'Thiết kế + thi công + nội thất — một đầu mối duy nhất.', items: ['Tiết kiệm 15–20% chi phí', 'Không phát sinh ngoài hợp đồng', 'Tiến độ rõ ràng', 'Cam kết chất lượng'] },
  { icon: <RefreshCw size={28} />, title: 'Cải Tạo Không Gian', desc: 'Nâng cấp, làm mới căn nhà mà không cần xây lại.', items: ['Cải tạo phòng khách, bếp', 'Thay đổi layout hiệu quả', 'Nâng cấp vật liệu', 'Thi công nhanh gọn'] },
];

const packages = [
  { name: 'Gói Basic', desc: 'Thiết kế cơ bản, phù hợp ngân sách vừa phải.', price: '2.5tr', featured: false, features: ['Thiết kế 2D + 1 phương án 3D', 'Tư vấn phong cách', 'Bản vẽ kỹ thuật cơ bản', 'Dự toán sơ bộ', 'Hỗ trợ chọn vật liệu'] },
  { name: 'Gói Premium', desc: 'Thiết kế chuyên sâu, thi công trọn gói.', price: '4.5tr', featured: true, features: ['Thiết kế 3D toàn bộ', 'Giám sát thi công', 'Nội thất gỗ công nghiệp cao cấp', 'Bảo hành 3 năm', 'Bàn giao đúng tiến độ', 'Tặng bộ đèn trang trí'] },
  { name: 'Gói Signature', desc: 'Đẳng cấp riêng biệt, thiết kế độc bản.', price: '7.5tr', featured: false, features: ['Kiến trúc sư riêng', 'Thiết kế 3D Cinematic', 'Vật liệu nhập khẩu', 'Bảo hành 5 năm', 'Smart Home cơ bản', 'Quản lý dự án chuyên biệt'] },
];

const steps = [
  { title: 'Tiếp nhận', desc: 'Trao đổi nhu cầu, khảo sát thực tế công trình.' },
  { title: 'Thiết kế', desc: 'Lên phương án 3D, chỉnh sửa đến khi ưng ý.' },
  { title: 'Báo giá', desc: 'Dự toán chi tiết, minh bạch từng hạng mục.' },
  { title: 'Thi công', desc: 'Sản xuất & lắp đặt, giám sát chặt chẽ.' },
  { title: 'Bàn giao', desc: 'Nghiệm thu, bàn giao và bảo hành dài hạn.' },
];

export default Services;
