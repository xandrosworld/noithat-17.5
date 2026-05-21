import { useState } from 'react';
import { ArrowRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const S = { accent: '#C8A55C', primary: '#1F2937', muted: '#6B7280', font: "'Be Vietnam Pro', sans-serif" };

const projects = [
  { id: 1, title: 'Biệt thự Vinhomes Riverside', cat: 'Biệt Thự', style: 'Tân Cổ Điển', area: '320m²', img: '/assets/generated/luxury_bedroom_interior.png' },
  { id: 2, title: 'Penthouse Landmark 81', cat: 'Căn Hộ', style: 'Hiện Đại', area: '180m²', img: '/assets/generated/hero_interior_living_room.png' },
  { id: 3, title: 'Nhà phố liền kề Sala', cat: 'Nhà Phố', style: 'Tối Giản', area: '240m²', img: '/assets/generated/premium_kitchen_interior.png' },
  { id: 4, title: 'Villa Ngoại Ô Mũi Né', cat: 'Biệt Thự', style: 'Nhiệt Đới', area: '450m²', img: '/assets/generated/project_villa_exterior.png' },
  { id: 5, title: 'Văn phòng Tech Startup', cat: 'Văn Phòng', style: 'Hiện Đại', area: '200m²', img: '/assets/generated/project_office_modern.png' },
  { id: 6, title: 'Showroom Thời Trang V', cat: 'Showroom', style: 'Sang Trọng', area: '160m²', img: '/assets/generated/blog_interior_tips.png' },
];

const categories = ['Tất cả', 'Biệt Thự', 'Căn Hộ', 'Nhà Phố', 'Văn Phòng', 'Showroom'];

const Projects = () => {
  const [activeCat, setActiveCat] = useState('Tất cả');
  const [hovered, setHovered] = useState<number | null>(null);
  const filtered = activeCat === 'Tất cả' ? projects : projects.filter(p => p.cat === activeCat);

  return (
    <div>
      {/* Page Header */}
      <section style={{ backgroundColor: S.primary, color: '#fff', padding: '80px 0 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px' }}>
          <p style={{ color: S.accent, textTransform: 'uppercase', letterSpacing: 3, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Dấu Ấn 4U Home</p>
          <h1 style={{ fontFamily: S.font, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#fff', marginBottom: 16 }}>Dự Án Tiêu Biểu</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 600, margin: '0 auto', fontSize: 16 }}>
            Khám phá những không gian sống đẳng cấp được thiết kế và thi công bởi đội ngũ kiến trúc sư tài năng của 4U HOME.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px' }}>
          {/* Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 56 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: S.muted, fontWeight: 500, marginRight: 8 }}>
              <Filter size={16} /> Lọc:
            </span>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)}
                style={{
                  padding: '10px 22px', borderRadius: 6, fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
                  border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
                  backgroundColor: activeCat === cat ? S.primary : '#F3F4F6',
                  color: activeCat === cat ? '#fff' : S.primary,
                }}>{cat}</button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }} className="projects-grid stagger-children">
            {filtered.map(p => (
              <div key={p.id} style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}>
                <div style={{
                  position: 'relative', overflow: 'hidden', borderRadius: 12, height: 300,
                  marginBottom: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}>
                  <img src={p.img} alt={p.title} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                    transform: hovered === p.id ? 'scale(1.06)' : 'scale(1)',
                  }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundColor: hovered === p.id ? 'rgba(0,0,0,0.15)' : 'transparent',
                    transition: 'all 0.3s',
                  }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: S.accent, fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>{p.cat}</span>
                  <span style={{ color: '#D1D5DB' }}>·</span>
                  <span style={{ color: S.muted, fontSize: 12 }}>{p.style}</span>
                  <span style={{ color: '#D1D5DB' }}>·</span>
                  <span style={{ color: S.muted, fontSize: 12 }}>{p.area}</span>
                </div>
                <h3 style={{ fontFamily: S.font, fontSize: 20, color: hovered === p.id ? S.accent : S.primary, marginBottom: 8, transition: 'color 0.3s' }}>{p.title}</h3>
                <Link to={`/du-an/${p.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: S.primary }}>
                  Xem chi tiết <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
};

export default Projects;
