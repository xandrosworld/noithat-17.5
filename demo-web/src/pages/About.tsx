import { CheckCircle, Award, Users, Home as HomeIcon, Clock, Target, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const S = { accent: '#C8A55C', primary: '#1F2937', muted: '#6B7280' };

const About = () => (
  <div>
    {/* Hero */}
    <section style={{ backgroundColor: S.primary, padding: '80px 0 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06 }}>
        <img src="/assets/generated/luxury_bedroom_interior.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: '0 40px' }}>
        <p style={{ color: S.accent, textTransform: 'uppercase', letterSpacing: 3, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Câu chuyện thương hiệu</p>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: 16, fontWeight: 700 }}>Về 4U HOME</h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 600, margin: '0 auto', fontSize: 16 }}>
          Hơn một thập kỷ kiến tạo không gian sống đẳng cấp — nơi mỗi căn nhà đều mang câu chuyện riêng của gia chủ.
        </p>
      </div>
    </section>

    {/* Story */}
    <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="about-grid">
          <div>
            <p style={{ color: S.accent, textTransform: 'uppercase', letterSpacing: 3, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Câu chuyện của chúng tôi</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: S.primary, fontWeight: 700, marginBottom: 20 }}>Từ Đam Mê Đến Thương Hiệu</h2>
            <p style={{ color: S.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              4U HOME được sáng lập với triết lý đơn giản: mỗi gia đình xứng đáng có một không gian sống đẹp, tiện nghi và mang đậm dấu ấn cá nhân.
            </p>
            <p style={{ color: S.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
              Bắt đầu từ một xưởng nội thất nhỏ, đến nay chúng tôi đã phát triển thành đơn vị thiết kế & thi công nội thất với đội ngũ kiến trúc sư, kỹ sư và thợ lành nghề. Mỗi dự án là một tác phẩm — chúng tôi không sản xuất hàng loạt, mà kiến tạo từng chi tiết.
            </p>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {[{ icon: <Target size={20} />, label: 'Sứ mệnh', text: 'Nâng tầm chất lượng sống qua thiết kế' },
                { icon: <Eye size={20} />, label: 'Tầm nhìn', text: 'Top 10 thương hiệu nội thất Việt Nam' },
                { icon: <Heart size={20} />, label: 'Giá trị cốt lõi', text: 'Tận tâm · Chất lượng · Sáng tạo' },
              ].map((v, i) => (
                <div key={i} style={{ flex: '1 1 200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: S.accent, marginBottom: 6 }}>{v.icon}<span style={{ fontWeight: 700, fontSize: 14, color: S.primary }}>{v.label}</span></div>
                  <p style={{ color: S.muted, fontSize: 13 }}>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img src="/assets/generated/project_office_modern.png" alt="4U Home Team" style={{ width: '100%', height: 480, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section style={{ padding: '64px 0', backgroundColor: S.primary }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32, textAlign: 'center' }} className="stats-grid">
          {[{ icon: <HomeIcon size={28} />, num: '500+', label: 'Công trình hoàn thiện' },
            { icon: <Users size={28} />, num: '1,200+', label: 'Khách hàng' },
            { icon: <Award size={28} />, num: '10+', label: 'Năm kinh nghiệm' },
            { icon: <Clock size={28} />, num: '98%', label: 'Đúng tiến độ' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ color: S.accent, marginBottom: 12, display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
              <div style={{ fontSize: 40, fontWeight: 800, color: '#fff', marginBottom: 4, lineHeight: 1 }}>{s.num}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Commitments */}
    <section style={{ padding: '80px 0', backgroundColor: '#F5F5F0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ color: S.accent, textTransform: 'uppercase', letterSpacing: 3, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Cam kết 4U HOME</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: S.primary, fontWeight: 700 }}>Tại Sao Chọn Chúng Tôi?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }} className="commit-grid">
          {commitments.map((c, i) => (
            <div key={i} style={{ backgroundColor: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <CheckCircle size={28} style={{ color: S.accent, marginBottom: 16 }} />
              <h3 style={{ fontSize: 17, fontWeight: 700, color: S.primary, marginBottom: 10 }}>{c.title}</h3>
              <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.7 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ padding: '80px 0', backgroundColor: '#fff', textAlign: 'center' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 32px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: S.primary, fontWeight: 700, marginBottom: 16 }}>Hãy Bắt Đầu Dự Án Của Bạn</h2>
        <p style={{ color: S.muted, marginBottom: 32 }}>Liên hệ ngay để nhận tư vấn miễn phí từ đội ngũ kiến trúc sư của 4U HOME.</p>
        <Link to="/lien-he" style={{ display: 'inline-block', padding: '16px 40px', backgroundColor: S.accent, color: '#fff', fontWeight: 700, fontSize: 15, borderRadius: 8, letterSpacing: 0.5 }}>Liên hệ tư vấn</Link>
      </div>
    </section>

    <style>{`
      @media (max-width: 1024px) { .about-grid { grid-template-columns: 1fr !important; } .stats-grid { grid-template-columns: repeat(2,1fr) !important; } .commit-grid { grid-template-columns: 1fr !important; } }
      @media (max-width: 640px) { .stats-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </div>
);

const commitments = [
  { title: 'Thiết kế đẹp, đúng gu', text: 'Kiến trúc sư tư vấn tận tâm, lên phương án 3D sát thực tế. Không thiết kế đại trà.' },
  { title: 'Thi công chuẩn vật liệu', text: 'Sử dụng đúng vật liệu trong hợp đồng. Mẫu vật liệu được duyệt trước khi thi công.' },
  { title: 'Tối ưu ngân sách', text: 'Báo giá minh bạch, cam kết không phát sinh chi phí ngoài hợp đồng đã ký.' },
  { title: 'Bàn giao đúng tiến độ', text: 'Lịch thi công rõ ràng, cập nhật tiến độ hàng tuần. Phạt hợp đồng nếu chậm.' },
  { title: 'Bảo hành dài hạn', text: 'Bảo hành 2–5 năm tùy hạng mục. Hỗ trợ bảo trì trọn đời công trình.' },
  { title: 'Website chuẩn SEO', text: '4U HOME có website chuẩn SEO, kéo lead từ Google/Facebook — giúp khách hàng tìm đến bạn tự nhiên.' },
];

export default About;
