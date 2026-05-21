import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

const S = { accent: '#C8A55C', primary: '#1F2937', muted: '#6B7280' };

const categories = ['Tất cả', 'Kinh nghiệm thiết kế', 'Báo giá nội thất', 'Phong cách nội thất', 'Vật liệu', 'Mẹo tối ưu không gian'];

const articles = [
  { id: 'toi-uu-khong-gian-can-ho', title: '10 Mẹo Tối Ưu Không Gian Cho Căn Hộ Dưới 70m²', cat: 'Mẹo tối ưu không gian', date: '15/05/2026', img: '/assets/generated/hero_interior_living_room.png', excerpt: 'Khám phá cách biến căn hộ nhỏ thành không gian sống tiện nghi, thông minh và đầy phong cách.' },
  { id: 'bao-gia-thiet-ke-2026', title: 'Bảng Báo Giá Thiết Kế Nội Thất 2026 Mới Nhất', cat: 'Báo giá nội thất', date: '12/05/2026', img: '/assets/generated/premium_kitchen_interior.png', excerpt: 'Cập nhật bảng giá thiết kế & thi công nội thất theo từng phân khúc: căn hộ, nhà phố, biệt thự.' },
  { id: 'phong-cach-minimalist', title: 'Phong Cách Minimalist — Ít Hơn Là Nhiều Hơn', cat: 'Phong cách nội thất', date: '10/05/2026', img: '/assets/generated/luxury_bedroom_interior.png', excerpt: 'Tìm hiểu triết lý tối giản trong nội thất và cách áp dụng cho ngôi nhà Việt Nam hiện đại.' },
  { id: 'vat-lieu-go-cong-nghiep', title: 'Gỗ Công Nghiệp Hay Gỗ Tự Nhiên: Lựa Chọn Nào Cho Bạn?', cat: 'Vật liệu', date: '08/05/2026', img: '/assets/generated/blog_interior_tips.png', excerpt: 'So sánh chi tiết ưu nhược điểm, giá thành và độ bền của từng loại gỗ phổ biến hiện nay.' },
  { id: 'thiet-ke-phong-bep', title: 'Thiết Kế Phòng Bếp Mở: Xu Hướng Không Thể Bỏ Qua', cat: 'Kinh nghiệm thiết kế', date: '05/05/2026', img: '/assets/generated/premium_kitchen_interior.png', excerpt: 'Bếp mở kết hợp phòng khách — giải pháp tối ưu cho gia đình hiện đại, tăng kết nối và ánh sáng.' },
  { id: 'cai-tao-nha-cu', title: 'Cải Tạo Nhà Cũ: Chi Phí Bao Nhiêu & Cần Lưu Ý Gì?', cat: 'Kinh nghiệm thiết kế', date: '01/05/2026', img: '/assets/generated/project_villa_exterior.png', excerpt: 'Hướng dẫn chi tiết quy trình cải tạo nhà cũ, từ khảo sát đến hoàn thiện và các mức chi phí tham khảo.' },
];

const Blog = () => {
  const [activeCat, setActiveCat] = useState('Tất cả');
  const filtered = activeCat === 'Tất cả' ? articles : articles.filter(a => a.cat === activeCat);

  return (
    <div>
      <section style={{ backgroundColor: S.primary, padding: '80px 0 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px' }}>
          <p style={{ color: S.accent, textTransform: 'uppercase', letterSpacing: 3, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Kiến thức nội thất</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: 16, fontWeight: 700 }}>Tin Tức & Blog</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 600, margin: '0 auto', fontSize: 16 }}>Chia sẻ kinh nghiệm, xu hướng thiết kế và mẹo hay cho ngôi nhà của bạn.</p>
        </div>
      </section>

      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48, justifyContent: 'center' }}>
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCat(c)} style={{
                padding: '10px 20px', borderRadius: 6, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                backgroundColor: activeCat === c ? S.primary : '#F3F4F6', color: activeCat === c ? '#fff' : S.primary,
              }}>{c}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }} className="blog-grid">
            {filtered.map(a => (
              <Link to={`/tin-tuc/${a.id}`} key={a.id} style={{ display: 'block', borderRadius: 12, overflow: 'hidden', border: '1px solid #F3F4F6', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ height: 220, overflow: 'hidden' }}>
                  <img src={a.img} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ color: S.accent, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>{a.cat}</span>
                    <span style={{ color: '#D1D5DB' }}>·</span>
                    <span style={{ color: S.muted, fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {a.date}</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: S.primary, marginBottom: 8, lineHeight: 1.4 }}>{a.title}</h3>
                  <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{a.excerpt}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: S.accent, fontSize: 13, fontWeight: 600 }}>Đọc tiếp <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) { .blog-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px) { .blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
};

export default Blog;
