import { useParams, Link } from 'react-router-dom';
import { MapPin, Maximize, Palette, Layers, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const S = { accent: '#C8A55C', primary: '#1F2937', muted: '#6B7280' };

const allProjects: Record<string, ProjectData> = {
  '1': { title: 'Biệt thự Vinhomes Riverside', style: 'Tân Cổ Điển', area: '320m²', location: 'Long Biên, Hà Nội', scope: 'Thiết kế & Thi công trọn gói', hero: '/assets/generated/luxury_bedroom_interior.png',
    gallery: ['/assets/generated/luxury_bedroom_interior.png', '/assets/generated/hero_interior_living_room.png', '/assets/generated/premium_kitchen_interior.png', '/assets/generated/project_office_modern.png'],
    story: 'Gia chủ mong muốn một không gian sống mang hơi thở châu Âu nhưng vẫn gần gũi, ấm áp. Đội ngũ 4U HOME đã phối hợp chất liệu gỗ tự nhiên walnut, đá marble trắng Ý và hệ rèm len cao cấp để tạo nên tổng thể sang trọng mà không xa cách.',
    materials: ['Gỗ Walnut tự nhiên', 'Đá Marble Calacatta', 'Vải Bỉ nhập khẩu', 'Phụ kiện Hafele'] },
  '2': { title: 'Penthouse Landmark 81', style: 'Hiện Đại', area: '180m²', location: 'Bình Thạnh, TP.HCM', scope: 'Thiết kế nội thất', hero: '/assets/generated/hero_interior_living_room.png',
    gallery: ['/assets/generated/hero_interior_living_room.png', '/assets/generated/premium_kitchen_interior.png', '/assets/generated/luxury_bedroom_interior.png', '/assets/generated/blog_interior_tips.png'],
    story: 'Với tầm view panorama thành phố, thiết kế hướng đến tối đa hóa ánh sáng tự nhiên và tầm nhìn. Bảng màu trung tính kết hợp điểm nhấn xanh rêu tạo cảm giác thư giãn tuyệt đối.',
    materials: ['Gỗ sồi tẩy trắng', 'Kính cường lực Low-E', 'Sơn Jotun cao cấp', 'Đèn Flos nhập khẩu'] },
  '3': { title: 'Nhà phố liền kề Sala', style: 'Tối Giản', area: '240m²', location: 'Quận 2, TP.HCM', scope: 'Thiết kế & Thi công trọn gói', hero: '/assets/generated/premium_kitchen_interior.png',
    gallery: ['/assets/generated/premium_kitchen_interior.png', '/assets/generated/hero_interior_living_room.png', '/assets/generated/project_villa_exterior.png', '/assets/generated/luxury_bedroom_interior.png'],
    story: 'Phong cách tối giản Nhật Bản — mỗi chi tiết đều có mục đích. Không gian mở liên thông giữa bếp, phòng khách và sân vườn tạo luồng gió và ánh sáng xuyên suốt.',
    materials: ['Gỗ tần bì Nhật', 'Gạch Terrazzo', 'Sơn khoáng Keim', 'Phụ kiện Blum Áo'] },
  '4': { title: 'Villa Ngoại Ô Mũi Né', style: 'Nhiệt Đới', area: '450m²', location: 'Mũi Né, Bình Thuận', scope: 'Thiết kế kiến trúc & nội thất', hero: '/assets/generated/project_villa_exterior.png',
    gallery: ['/assets/generated/project_villa_exterior.png', '/assets/generated/hero_interior_living_room.png', '/assets/generated/luxury_bedroom_interior.png', '/assets/generated/blog_interior_tips.png'],
    story: 'Villa nghỉ dưỡng mang phong cách tropical hiện đại, tối ưu hóa không gian ngoài trời với hồ bơi tràn, sân vườn nhiệt đới và hệ mái dốc đặc trưng.',
    materials: ['Gỗ teak outdoor', 'Đá ong tự nhiên', 'Mái ngói phẳng', 'Kính Low-E chống nắng'] },
  '5': { title: 'Văn phòng Tech Startup', style: 'Hiện Đại', area: '200m²', location: 'Quận 1, TP.HCM', scope: 'Thiết kế & Thi công', hero: '/assets/generated/project_office_modern.png',
    gallery: ['/assets/generated/project_office_modern.png', '/assets/generated/hero_interior_living_room.png', '/assets/generated/premium_kitchen_interior.png', '/assets/generated/blog_interior_tips.png'],
    story: 'Không gian làm việc mở, linh hoạt, khuyến khích sáng tạo. Khu vực breakout, phòng họp kính và green wall tạo nên môi trường làm việc năng động.',
    materials: ['Vách kính cường lực', 'Sàn vinyl Luxury', 'Bàn ghế Steelcase', 'Cây xanh nội thất'] },
  '6': { title: 'Showroom Thời Trang V', style: 'Sang Trọng', area: '160m²', location: 'Quận 3, TP.HCM', scope: 'Thiết kế & Thi công', hero: '/assets/generated/blog_interior_tips.png',
    gallery: ['/assets/generated/blog_interior_tips.png', '/assets/generated/luxury_bedroom_interior.png', '/assets/generated/premium_kitchen_interior.png', '/assets/generated/project_office_modern.png'],
    story: 'Showroom thời trang cao cấp cần tôn lên sản phẩm — ánh sáng track light chuyên dụng, gương toàn thân và bảng màu trung tính giúp quần áo là nhân vật chính.',
    materials: ['Kệ inox mạ vàng', 'Gương chống chói', 'Sàn Epoxy cao cấp', 'Đèn track Erco'] },
};

interface ProjectData { title: string; style: string; area: string; location: string; scope: string; hero: string; gallery: string[]; story: string; materials: string[]; }

const ProjectDetail = () => {
  const { id } = useParams();
  const project = allProjects[id || '1'] || allProjects['1'];
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', height: 500 }}>
        <img src={project.hero} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px' }}>
          <div style={{ maxWidth: 1320, margin: '0 auto' }}>
            <Link to="/du-an" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 16 }}><ArrowLeft size={16} /> Tất cả dự án</Link>
            <span style={{ display: 'block', color: S.accent, fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>{project.style}</span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', fontWeight: 700, marginBottom: 0 }}>{project.title}</h1>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section style={{ backgroundColor: '#F5F5F0', padding: '24px 0' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px', display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {[{ icon: <Maximize size={18} />, label: 'Diện tích', value: project.area },
            { icon: <Palette size={18} />, label: 'Phong cách', value: project.style },
            { icon: <MapPin size={18} />, label: 'Địa điểm', value: project.location },
            { icon: <Layers size={18} />, label: 'Hạng mục', value: project.scope },
          ].map((info, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: S.accent }}>{info.icon}</span>
              <div>
                <div style={{ fontSize: 12, color: S.muted, fontWeight: 500 }}>{info.label}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: S.primary }}>{info.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery + Story */}
      <section style={{ padding: '64px 0', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48 }} className="detail-grid">
            {/* Gallery */}
            <div>
              <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 16, height: 420 }}>
                <img src={project.gallery[activeImg]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
                {project.gallery.map((img, i) => (
                  <div key={i} onClick={() => setActiveImg(i)} style={{
                    borderRadius: 8, overflow: 'hidden', height: 80, cursor: 'pointer',
                    border: activeImg === i ? '3px solid ' + S.accent : '3px solid transparent', transition: 'border 0.2s',
                  }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Story */}
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: S.primary, marginBottom: 20 }}>Câu Chuyện Thiết Kế</h2>
              <p style={{ color: S.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>{project.story}</p>

              <h3 style={{ fontSize: 18, fontWeight: 700, color: S.primary, marginBottom: 16 }}>Vật Liệu & Chất Liệu</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
                {project.materials.map((m, i) => (
                  <span key={i} style={{ padding: '8px 16px', backgroundColor: '#F5F5F0', borderRadius: 20, fontSize: 13, fontWeight: 500, color: S.primary }}>{m}</span>
                ))}
              </div>

              <Link to="/lien-he" style={{
                display: 'inline-block', padding: '16px 32px', backgroundColor: S.accent, color: '#fff',
                fontWeight: 700, fontSize: 14, borderRadius: 8, letterSpacing: 0.5,
              }}>Tư vấn dự án tương tự</Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) { .detail-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
};

export default ProjectDetail;
