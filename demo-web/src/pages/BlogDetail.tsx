import { Link } from 'react-router-dom';
import { Clock, ArrowLeft, CheckCircle } from 'lucide-react';

const S = { accent: '#C8A55C', primary: '#1F2937', muted: '#6B7280' };

const BlogDetail = () => (
  <div>
    <section style={{ backgroundColor: S.primary, padding: '80px 0 40px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px' }}>
        <Link to="/tin-tuc" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 20 }}><ArrowLeft size={16} /> Quay lại danh sách</Link>
        <span style={{ display: 'block', color: S.accent, fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>Mẹo tối ưu không gian</span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#fff', fontWeight: 700, lineHeight: 1.3, marginBottom: 16 }}>10 Mẹo Tối Ưu Không Gian Cho Căn Hộ Dưới 70m²</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
          <Clock size={14} /> <span>15/05/2026</span> <span>·</span> <span>8 phút đọc</span>
        </div>
      </div>
    </section>

    <section style={{ padding: '60px 0 80px', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px' }}>
        <img src="/assets/generated/hero_interior_living_room.png" alt="Tối ưu không gian" style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 12, marginBottom: 40 }} />

        <div style={{ fontSize: 16, lineHeight: 1.9, color: '#374151' }}>
          <p style={{ marginBottom: 20 }}>
            Sống trong căn hộ nhỏ không có nghĩa là phải chấp nhận chật chội. Với những mẹo thiết kế thông minh, bạn hoàn toàn có thể biến không gian 50–70m² thành một tổ ấm vừa tiện nghi, vừa đầy phong cách.
          </p>
          <p style={{ marginBottom: 20 }}>
            Dưới đây là 10 mẹo mà đội ngũ kiến trúc sư tại 4U HOME đã đúc kết từ hàng trăm dự án thực tế:
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: S.primary, marginTop: 32, marginBottom: 16 }}>1. Ưu tiên nội thất đa năng</h2>
          <p style={{ marginBottom: 20 }}>
            Giường có ngăn kéo chứa đồ, bàn ăn gấp gọn, sofa giường — mỗi món đồ nên đảm nhận ít nhất 2 chức năng. Điều này giúp tiết kiệm diện tích đáng kể mà không hy sinh tiện ích.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: S.primary, marginTop: 32, marginBottom: 16 }}>2. Tận dụng chiều cao — tủ kịch trần</h2>
          <p style={{ marginBottom: 20 }}>
            Thay vì dùng tủ thấp, hãy đầu tư tủ kịch trần. Phần trên cùng lưu trữ đồ ít dùng, phần dưới để vật dụng hàng ngày. Vừa gọn, vừa tạo cảm giác cao ráo cho phòng.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: S.primary, marginTop: 32, marginBottom: 16 }}>3. Gương — "vũ khí bí mật" mở rộng không gian</h2>
          <p style={{ marginBottom: 20 }}>
            Đặt gương lớn đối diện cửa sổ để phản chiếu ánh sáng tự nhiên. Không gian lập tức cảm giác rộng gấp đôi mà chi phí gần như không đáng kể.
          </p>

          <div style={{ backgroundColor: '#F9F5ED', borderLeft: '4px solid ' + S.accent, padding: '20px 24px', borderRadius: '0 8px 8px 0', margin: '32px 0' }}>
            <p style={{ fontWeight: 600, color: S.primary, marginBottom: 8 }}>💡 Mẹo từ KTS 4U HOME:</p>
            <p style={{ color: S.muted, margin: 0 }}>Khi thiết kế căn hộ nhỏ, luôn bắt đầu từ công năng trước, thẩm mỹ sau. Một không gian đẹp nhưng bất tiện sẽ nhanh chóng khiến gia chủ mệt mỏi.</p>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: S.primary, marginTop: 32, marginBottom: 16 }}>Checklist tối ưu không gian nhỏ</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
            {['Dùng tone sáng (trắng, be, xám nhạt) cho tường và trần', 'Chọn nội thất chân cao để tạo cảm giác thoáng', 'Hạn chế vách ngăn cứng, ưu tiên kệ mở', 'Tối ưu ánh sáng tự nhiên, dùng rèm mỏng', 'Giấu bớt đồ đạc vào hệ tủ âm tường', 'Sử dụng bếp đảo hoặc bếp mở'].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <CheckCircle size={18} style={{ color: S.accent, flexShrink: 0, marginTop: 3 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <img src="/assets/generated/premium_kitchen_interior.png" alt="Bếp tối ưu" style={{ width: '100%', height: 350, objectFit: 'cover', borderRadius: 12, marginBottom: 16 }} />
          <p style={{ fontSize: 13, color: S.muted, textAlign: 'center', marginBottom: 32 }}>Phòng bếp mở tối ưu trong căn hộ 65m² — Dự án của 4U HOME</p>

          <p style={{ marginBottom: 20 }}>
            Quan trọng nhất, mỗi căn hộ có đặc thù riêng. Đừng áp dụng máy móc — hãy để kiến trúc sư khảo sát thực tế và đưa ra giải pháp phù hợp nhất cho gia đình bạn.
          </p>
        </div>

        {/* CTA */}
        <div style={{ backgroundColor: '#F5F5F0', borderRadius: 16, padding: '40px 32px', textAlign: 'center', marginTop: 48 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: S.primary, marginBottom: 12 }}>Cần tư vấn thiết kế cho căn hộ nhỏ?</h3>
          <p style={{ color: S.muted, marginBottom: 24 }}>Đội ngũ 4U HOME sẵn sàng lên phương án miễn phí cho bạn.</p>
          <Link to="/lien-he" style={{ display: 'inline-block', padding: '14px 36px', backgroundColor: S.accent, color: '#fff', fontWeight: 700, borderRadius: 8 }}>Nhận tư vấn miễn phí</Link>
        </div>
      </div>
    </section>
  </div>
);

export default BlogDetail;
