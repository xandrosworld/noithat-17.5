import { useState, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronRight,
  Code,
  ExternalLink,
  Eye,
  FileText,
  FolderKanban,
  Globe,
  Image,
  LayoutDashboard,
  Link2,
  Menu,
  PenLine,
  Save,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  UploadCloud,
  Users,
  X,
} from 'lucide-react';

/* ─── Brand tokens ─── */
const T = {
  navy: '#1F2937',
  navyLight: '#374151',
  navyDeep: '#111827',
  gold: '#C8A55C',
  goldSoft: '#F9F5ED',
  goldDark: '#A68940',
  surface: '#FFFFFF',
  muted: '#6B7280',
  mutedLight: '#9CA3AF',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  bg: '#F3F4F6',
  bgAlt: '#F9FAFB',
  success: '#059669',
  successBg: '#ECFDF5',
  successText: '#065F46',
  warning: '#D97706',
  warningBg: '#FEF3C7',
  warningText: '#92400E',
  info: '#0284C7',
  infoBg: '#E0F2FE',
  infoText: '#075985',
  danger: '#DC2626',
  dangerBg: '#FEF2F2',
  radius: 10,
  radiusSm: 6,
  font: "'Be Vietnam Pro', system-ui, sans-serif",
  mono: "'JetBrains Mono', Consolas, 'Courier New', monospace",
};

/* ─── Types ─── */
type TabId =
  | 'dashboard'
  | 'banner'
  | 'projects'
  | 'blog'
  | 'leads'
  | 'seo'
  | 'redirects'
  | 'scripts'
  | 'settings';

type Tab = { id: TabId; name: string; icon: ReactNode; badge?: string };
type CmsModule = { module: string; owner: string; functions: string; seoOutput: string; status: 'Đủ demo' | 'Cần dữ liệu' | 'Bàn giao' };
type FieldGroup = { title: string; fields: string[] };

/* ─── Static data ─── */
const tabs: Tab[] = [
  { id: 'dashboard', name: 'Tổng quan', icon: <LayoutDashboard size={18} /> },
  { id: 'banner', name: 'Banner & Menu', icon: <Image size={18} /> },
  { id: 'projects', name: 'Dự án / Gallery', icon: <FolderKanban size={18} /> },
  { id: 'blog', name: 'Blog & SEO', icon: <PenLine size={18} />, badge: '3' },
  { id: 'leads', name: 'Khách hàng', icon: <Users size={18} />, badge: '5' },
  { id: 'seo', name: 'SEO & Tracking', icon: <Globe size={18} /> },
  { id: 'redirects', name: 'Redirect', icon: <ArrowLeftRight size={18} /> },
  { id: 'scripts', name: 'Custom Scripts', icon: <Code size={18} /> },
  { id: 'settings', name: 'Cài đặt & Bàn giao', icon: <Settings size={18} /> },
];

const tabLabels: Record<TabId, string> = {
  dashboard: 'Tổng quan CMS',
  banner: 'Banner, Menu & Trang tĩnh',
  projects: 'Quản lý Dự án / Gallery',
  blog: 'Blog & Landing SEO',
  leads: 'Khách hàng & Leads',
  seo: 'Cấu hình SEO & Tracking',
  redirects: 'Redirect 301/302',
  scripts: 'Custom Scripts & HTML Tags',
  settings: 'Cài đặt chung & Bàn giao',
};

const cmsModules: CmsModule[] = [
  { module: 'Trang tĩnh & menu', owner: 'Admin nội dung', functions: 'Tạo/sửa trang giới thiệu, dịch vụ, báo giá; sắp xếp menu header/footer; bật/tắt hiển thị; xem trước trước khi xuất bản.', seoOutput: 'Slug, SEO title, meta description, canonical, robots index/follow, breadcrumb schema.', status: 'Đủ demo' },
  { module: 'Banner trang chủ', owner: 'Admin marketing', functions: 'Quản lý slide hero, ảnh desktop/mobile, tiêu đề, CTA, thứ tự, lịch hiển thị và trạng thái chiến dịch.', seoOutput: 'Alt ảnh, lazy-load, link CTA có UTM, event click_banner cho GA4/Pixel.', status: 'Đủ demo' },
  { module: 'Dự án / Gallery', owner: 'Admin nội dung', functions: 'Thêm dự án, phân loại công trình/phong cách/khu vực, nhập thông số, câu chuyện thiết kế, vật liệu, album ảnh.', seoOutput: 'Project schema, alt/caption ảnh, internal link tới dịch vụ liên quan, URL dự án thân thiện.', status: 'Đủ demo' },
  { module: 'Blog tin tức', owner: 'Content SEO', functions: 'Quản lý danh mục, bài viết, tác giả, ngày xuất bản/cập nhật, mục lục, FAQ, bài liên quan và trạng thái duyệt.', seoOutput: 'Article schema, FAQ schema, OG image, focus keyword, internal links, sitemap blog.', status: 'Đủ demo' },
  { module: 'Landing page SEO', owner: 'SEO/Performance', functions: 'Nhân bản template theo dịch vụ/khu vực/từ khóa, thêm block nội dung, form CTA, FAQ, bảng giá và liên kết về trang mẹ.', seoOutput: 'Index/noindex, canonical, sitemap priority, keyword mapping, conversion event theo từng landing.', status: 'Cần dữ liệu' },
  { module: 'Lead & form liên hệ', owner: 'Sale/Admin', functions: 'Lưu lead từ form, phân loại nguồn, trạng thái tư vấn, ghi chú, xuất CSV và đánh dấu lead đã xử lý.', seoOutput: 'Event lead_submit, phone_click, zalo_click; đo nguồn UTM và trang chuyển đổi.', status: 'Bàn giao' },
  { module: 'SEO kỹ thuật', owner: 'SEO/Performance', functions: 'Quản lý metadata toàn site/từng trang, schema, sitemap, robots, redirect, scripts đo lường và mã xác minh.', seoOutput: 'Sitemap.xml, robots.txt, JSON-LD, canonical tags, GTM/GA4/Meta Pixel.', status: 'Đủ demo' },
];

const seoFieldGroups: FieldGroup[] = [
  { title: 'Metadata bắt buộc', fields: ['SEO title 50-60 ký tự', 'Meta description 140-160 ký tự', 'Slug không dấu', 'Focus keyword', 'Canonical URL'] },
  { title: 'Indexing & Sitemap', fields: ['Index/Noindex', 'Follow/Nofollow', 'Sitemap priority', 'Change frequency', 'Ngày cập nhật cuối'] },
  { title: 'Social preview', fields: ['Open Graph title', 'Open Graph description', 'Ảnh chia sẻ 1200×630', 'Twitter card', 'Alt ảnh đại diện'] },
  { title: 'Structured data', fields: ['Organization/LocalBusiness', 'Article', 'Project/CreativeWork', 'FAQPage', 'BreadcrumbList'] },
];

const contentFieldGroups: FieldGroup[] = [
  { title: 'Dự án nội thất', fields: ['Tên dự án', 'Loại công trình', 'Diện tích', 'Phong cách', 'Địa điểm', 'Hạng mục thi công', 'Gallery + alt ảnh'] },
  { title: 'Bài viết SEO', fields: ['Danh mục', 'Tác giả', 'Ngày publish/update', 'Mô tả ngắn', 'Mục lục', 'FAQ', 'Bài viết liên quan'] },
  { title: 'Landing page', fields: ['Dịch vụ/khu vực/từ khóa', 'Hero CTA', 'Block nội dung', 'Bảng giá', 'FAQ', 'Form lead', 'Liên kết nội bộ'] },
];

const workflowSteps = [
  { step: 'Tạo nội dung trong CMS', desc: 'Admin nhập liệu theo form và field đã chuẩn hóa.' },
  { step: 'Nhập metadata & ảnh chuẩn SEO', desc: 'Hệ thống gợi ý SEO title, alt ảnh, slug tự sinh.' },
  { step: 'Xem trước giao diện', desc: 'Preview desktop/mobile trước khi lên sản phẩm.' },
  { step: 'Duyệt và xuất bản', desc: 'Trạng thái Nháp → Chờ duyệt → Đã xuất bản.' },
  { step: 'Tự động cập nhật sitemap/schema', desc: 'Hệ thống re-generate sitemap và JSON-LD.' },
  { step: 'Theo dõi event & lead', desc: 'GA4/Pixel ghi nhận và đẩy vào bảng lead.' },
];

const redirects = [
  { from: '/du-an-cu/biet-thu-01', to: '/du-an/1', type: '301' as const, hits: 126, active: true },
  { from: '/blog/thiet-ke-phong-khach', to: '/tin-tuc/toi-uu-khong-gian-can-ho', type: '301' as const, hits: 84, active: true },
  { from: '/lien-he-cu', to: '/lien-he', type: '302' as const, hits: 13, active: false },
];

const trackingEvents = [
  { event: 'lead_submit', trigger: 'Gửi form tư vấn', platform: 'GA4 + Meta Pixel' },
  { event: 'phone_click', trigger: 'Bấm nút gọi nhanh', platform: 'GA4' },
  { event: 'zalo_click', trigger: 'Bấm nút Zalo', platform: 'GA4 + Pixel' },
  { event: 'view_project', trigger: 'Xem chi tiết dự án', platform: 'GA4' },
  { event: 'scroll_75', trigger: 'Đọc 75% bài SEO', platform: 'GA4' },
];

/* ─── Shared inline styles ─── */
const S: Record<string, CSSProperties> = {
  input: {
    width: '100%', padding: '10px 14px',
    border: `1px solid ${T.border}`, borderRadius: T.radiusSm,
    fontSize: 13, outline: 'none', fontFamily: T.font,
    backgroundColor: '#fff', transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  label: { display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5, color: T.navyLight, letterSpacing: '0.02em' },
};

/* ─── Reusable components ─── */

const StatusBadge = ({ status }: { status: CmsModule['status'] }) => {
  const map = {
    'Đủ demo': { bg: T.successBg, color: T.successText },
    'Cần dữ liệu': { bg: T.warningBg, color: T.warningText },
    'Bàn giao': { bg: T.infoBg, color: T.infoText },
  };
  const s = map[status];
  return <span className="adm-badge" style={{ backgroundColor: s.bg, color: s.color }}>{status}</span>;
};

const Card = ({ icon, title, children, action }: { icon?: ReactNode; title: string; children: ReactNode; action?: ReactNode }) => (
  <section className="adm-card">
    <div className="adm-card-head">
      <h3 className="adm-card-title">
        {icon && <span className="adm-card-icon">{icon}</span>}
        {title}
      </h3>
      {action && <div className="adm-card-action">{action}</div>}
    </div>
    <div className="adm-card-body">{children}</div>
  </section>
);

const LabeledInput = ({ label, value, mono }: { label: string; value: string; mono?: boolean }) => (
  <div>
    <label style={S.label}>{label}</label>
    <input
      type="text"
      defaultValue={value}
      className="adm-input"
      style={{ fontFamily: mono ? T.mono : T.font, fontSize: mono ? 12 : 13 }}
    />
  </div>
);

const FieldGroupGrid = ({ groups }: { groups: FieldGroup[] }) => (
  <div className="adm-field-grid">
    {groups.map(g => (
      <div key={g.title} className="adm-field-card">
        <h4 className="adm-field-card-title">{g.title}</h4>
        <ul className="adm-check-list">
          {g.fields.map(f => (
            <li key={f}>
              <CheckCircle2 size={14} className="adm-check-icon" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const BtnPrimary = ({ children, icon }: { children: ReactNode; icon?: ReactNode }) => (
  <button className="adm-btn adm-btn-primary">{icon}{children}</button>
);
const BtnSecondary = ({ children, icon }: { children: ReactNode; icon?: ReactNode }) => (
  <button className="adm-btn adm-btn-secondary">{icon}{children}</button>
);

/* ─── Stat card ─── */
const StatCard = ({ value, label, icon, trend }: { value: string; label: string; icon: ReactNode; trend?: string }) => (
  <div className="adm-stat">
    <div className="adm-stat-icon">{icon}</div>
    <div className="adm-stat-info">
      <strong className="adm-stat-value">{value}</strong>
      <span className="adm-stat-label">{label}</span>
    </div>
    {trend && <span className="adm-stat-trend"><TrendingUp size={12} /> {trend}</span>}
  </div>
);

/* ═══════════════════════════════════════════════
   TAB CONTENT RENDERERS
   ═══════════════════════════════════════════════ */

const DashboardTab = () => (
  <div className="fade-in">
    <div className="adm-stats-row">
      <StatCard value="7+" label="Module CMS" icon={<LayoutDashboard size={20} />} trend="+2 mới" />
      <StatCard value="40+" label="Trường nội dung" icon={<Search size={20} />} />
      <StatCard value="5" label="Conversion events" icon={<BarChart3 size={20} />} trend="Đủ" />
      <StatCard value="3" label="Kênh tracking" icon={<Globe size={20} />} />
    </div>

    <Card icon={<ShieldCheck size={18} />} title="Bản đồ module CMS">
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Module</th><th>Người dùng chính</th><th>Chức năng quản trị</th><th>SEO/Tracking output</th><th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {cmsModules.map(m => (
              <tr key={m.module}>
                <td><strong>{m.module}</strong></td>
                <td>{m.owner}</td>
                <td>{m.functions}</td>
                <td>{m.seoOutput}</td>
                <td><StatusBadge status={m.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>

    <Card icon={<ChevronRight size={18} />} title="Luồng làm việc chuẩn SEO">
      <div className="adm-workflow">
        {workflowSteps.map((w, i) => (
          <div key={w.step} className="adm-wf-step">
            <span className="adm-wf-num">{i + 1}</span>
            <div>
              <strong>{w.step}</strong>
              <p>{w.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const BannerTab = () => (
  <div className="fade-in">
    <Card icon={<Image size={18} />} title="Form quản trị banner trang chủ"
      action={<div className="adm-btn-group"><BtnSecondary>Xem trước</BtnSecondary><BtnPrimary icon={<Save size={14} />}>Lưu banner</BtnPrimary></div>}>
      <div className="adm-form-grid">
        <LabeledInput label="Tiêu đề banner" value="Thiết Kế Nội Thất Uy Tín — Chuyên Nghiệp" />
        <LabeledInput label="Vị trí hiển thị" value="Trang chủ / Hero slide 01" />
        <LabeledInput label="CTA chính" value="Nhận tư vấn miễn phí" />
        <LabeledInput label="Link CTA + UTM" value="/lien-he?utm_source=homepage&utm_campaign=hero" mono />
        <LabeledInput label="Alt ảnh desktop" value="Không gian phòng khách hiện đại do 4U HOME thiết kế" />
        <LabeledInput label="Alt ảnh mobile" value="Mẫu nội thất căn hộ cao cấp 4U HOME" />
      </div>
    </Card>

    <Card icon={<Link2 size={18} />} title="Trường CMS cho menu & trang tĩnh">
      <FieldGroupGrid groups={[
        { title: 'Menu', fields: ['Tên menu', 'Đường dẫn', 'Menu cha/con', 'Thứ tự', 'Mở tab mới', 'Bật/tắt hiển thị'] },
        { title: 'Trang tĩnh', fields: ['Tiêu đề H1', 'Hero image', 'Nội dung block', 'FAQ', 'CTA cuối trang', 'Ảnh đại diện social'] },
        { title: 'SEO', fields: ['SEO title', 'Meta description', 'Slug', 'Canonical', 'Robots', 'Breadcrumb title'] },
      ]} />
    </Card>
  </div>
);

const ProjectsTab = () => (
  <div className="fade-in">
    <Card icon={<FolderKanban size={18} />} title="Thông tin dự án mẫu"
      action={<div className="adm-btn-group"><BtnSecondary icon={<Eye size={14} />}>Preview</BtnSecondary><BtnPrimary icon={<Save size={14} />}>Lưu dự án</BtnPrimary></div>}>
      <div className="adm-form-grid">
        <LabeledInput label="Tên dự án" value="Biệt thự Vinhomes Riverside" />
        <LabeledInput label="Slug" value="/du-an/biet-thu-vinhomes-riverside" mono />
        <LabeledInput label="Loại công trình" value="Biệt thự" />
        <LabeledInput label="Phong cách" value="Tân cổ điển" />
        <LabeledInput label="Diện tích" value="320m²" />
        <LabeledInput label="Khu vực" value="Long Biên, Hà Nội" />
      </div>
      <div style={{ marginTop: 16 }}>
        <label style={S.label}>Mô tả / câu chuyện thiết kế</label>
        <textarea
          rows={3}
          defaultValue="Gia chủ mong muốn không gian sống sang trọng nhưng ấm áp. 4U HOME phối hợp gỗ walnut, đá marble và ánh sáng gián tiếp để tối ưu trải nghiệm sống."
          className="adm-input adm-textarea"
        />
      </div>
    </Card>

    <Card icon={<UploadCloud size={18} />} title="Gallery ảnh có dữ liệu SEO">
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>Ảnh</th><th>Alt text</th><th>Caption</th><th>Vai trò SEO</th><th>Trạng thái</th></tr></thead>
          <tbody>
            {[
              ['Hero', 'Phòng khách biệt thự Vinhomes Riverside 4U HOME', 'Không gian phòng khách tân cổ điển', 'Ảnh OG + thumbnail dự án'],
              ['Gallery 01', 'Thiết kế bếp biệt thự gỗ walnut cao cấp', 'Khu vực bếp và bàn ăn', 'Image search + bài liên quan'],
              ['Gallery 02', 'Phòng ngủ master phong cách tân cổ điển', 'Phòng ngủ master', 'Internal link tới dịch vụ'],
            ].map(r => (
              <tr key={r[0]}><td><strong>{r[0]}</strong></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td><StatusBadge status="Đủ demo" /></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const BlogTab = () => (
  <div className="fade-in">
    <Card icon={<PenLine size={18} />} title="Trường nhập liệu theo loại nội dung">
      <FieldGroupGrid groups={contentFieldGroups} />
    </Card>

    <Card icon={<FileText size={18} />} title="Landing page SEO mẫu">
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>Block</th><th>Nội dung CMS</th><th>Mục tiêu SEO/Performance</th></tr></thead>
          <tbody>
            {[
              ['Hero', 'H1, mô tả ngắn, ảnh, CTA, số hotline', 'Khớp intent từ khóa và đo click CTA'],
              ['Bảng giá', 'Gói dịch vụ, đơn giá, điều kiện áp dụng', 'Tăng chuyển đổi và hỗ trợ rich content'],
              ['FAQ', 'Câu hỏi/trả lời theo keyword', 'FAQ schema + long-tail keyword'],
              ['Dự án liên quan', 'Chọn dự án theo phong cách/khu vực', 'Internal link và tăng thời gian trên trang'],
              ['Form tư vấn', 'Form theo landing, nguồn UTM', 'Event lead_submit và phân loại lead'],
            ].map(r => (
              <tr key={r[0]}><td><strong>{r[0]}</strong></td><td>{r[1]}</td><td>{r[2]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const LeadsTab = () => (
  <div className="fade-in">
    <div className="adm-stats-row">
      <StatCard value="12" label="Leads tháng này" icon={<Users size={20} />} trend="+4" />
      <StatCard value="3" label="Đang tư vấn" icon={<PenLine size={20} />} />
      <StatCard value="67%" label="Tỷ lệ phản hồi" icon={<TrendingUp size={20} />} trend="+12%" />
      <StatCard value="2" label="Đã hẹn lịch" icon={<CheckCircle2 size={20} />} />
    </div>

    <Card icon={<Users size={18} />} title="Danh sách lead mẫu"
      action={<BtnSecondary icon={<ExternalLink size={14} />}>Xuất CSV</BtnSecondary>}>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>Khách hàng</th><th>Nhu cầu</th><th>Nguồn</th><th>Trang vào</th><th>Trạng thái</th></tr></thead>
          <tbody>
            {[
              ['Nguyễn Minh A', 'Thiết kế căn hộ 70m²', 'Google / cpc', '/bao-gia-thiet-ke-noi-that', 'Mới'],
              ['Trần Gia B', 'Thi công biệt thự', 'Facebook / ads', '/du-an/biet-thu-vinhomes-riverside', 'Đang tư vấn'],
              ['Lê Hoàng C', 'Nội thất trọn gói', 'Organic Search', '/dich-vu', 'Đã hẹn lịch'],
            ].map(r => (
              <tr key={r[0]}>
                <td><strong>{r[0]}</strong></td><td>{r[1]}</td><td>{r[2]}</td>
                <td><code className="adm-code-inline">{r[3]}</code></td>
                <td>
                  <StatusBadge status={r[4] === 'Mới' ? 'Cần dữ liệu' : r[4] === 'Đang tư vấn' ? 'Đủ demo' : 'Bàn giao'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>

    <Card icon={<BarChart3 size={18} />} title="Conversion events cho tracking">
      <div className="adm-field-grid">
        {trackingEvents.map(ev => (
          <div key={ev.event} className="adm-event-card">
            <code className="adm-code-tag">{ev.event}</code>
            <p className="adm-event-trigger">{ev.trigger}</p>
            <p className="adm-event-platform">{ev.platform}</p>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const SeoTab = () => (
  <div className="fade-in">
    <Card icon={<Search size={18} />} title="SEO Title, Meta Tags & Indexing"
      action={<div className="adm-btn-group"><BtnSecondary>Hủy</BtnSecondary><BtnPrimary icon={<Save size={14} />}>Lưu cấu hình</BtnPrimary></div>}>
      <div className="adm-form-grid">
        <LabeledInput label="SEO Title" value="4U HOME — Thiết kế & Thi công nội thất cao cấp" />
        <LabeledInput label="Slug" value="/thiet-ke-thi-cong-noi-that" mono />
        <LabeledInput label="Canonical URL" value="https://4uhome.vn/thiet-ke-thi-cong-noi-that" mono />
        <LabeledInput label="Focus keyword" value="thiết kế thi công nội thất" />
        <LabeledInput label="Robots" value="index, follow" mono />
        <LabeledInput label="Sitemap priority" value="0.8 / weekly" mono />
      </div>
      <div style={{ marginTop: 16 }}>
        <label style={S.label}>Meta Description</label>
        <textarea rows={3} className="adm-input adm-textarea"
          defaultValue="4U HOME tự hào là đơn vị kiến tạo không gian sống đẳng cấp hàng đầu. Thiết kế, thi công nội thất trọn gói cho căn hộ, nhà phố, biệt thự."
        />
      </div>
    </Card>

    <Card icon={<Eye size={18} />} title="Bộ trường SEO bắt buộc cho mọi trang">
      <FieldGroupGrid groups={seoFieldGroups} />
    </Card>

    <Card icon={<Globe size={18} />} title="Sitemap, Robots & Schema">
      <div className="adm-form-grid">
        <LabeledInput label="Sitemap URL" value="https://4uhome.vn/sitemap.xml" mono />
        <LabeledInput label="Robots.txt" value="User-agent: * Allow: /" mono />
        <LabeledInput label="Schema mặc định" value="Organization + LocalBusiness" />
        <LabeledInput label="OG image mặc định" value="/assets/generated/hero_interior.png" mono />
      </div>
      <div style={{ marginTop: 16 }}>
        <label style={S.label}>Schema Markup (JSON-LD)</label>
        <textarea rows={6} className="adm-input adm-textarea adm-mono"
          defaultValue={`{\n  "@context": "https://schema.org",\n  "@type": "HomeAndConstructionBusiness",\n  "name": "4U HOME",\n  "url": "https://4uhome.vn",\n  "telephone": "0975.09.7777"\n}`}
        />
      </div>
    </Card>

    <Card icon={<BarChart3 size={18} />} title="Google Analytics, Tag Manager & Pixel">
      <div className="adm-form-grid">
        <LabeledInput label="Google Tag Manager ID" value="GTM-4UHOME88" mono />
        <LabeledInput label="Google Analytics ID" value="G-XXXXXXXXXX" mono />
        <LabeledInput label="Meta/Facebook Pixel ID" value="892374982374982" mono />
        <LabeledInput label="TikTok Pixel ID (tùy chọn)" value="Nhập nếu có" mono />
      </div>
    </Card>
  </div>
);

const RedirectsTab = () => (
  <div className="fade-in">
    <Card icon={<ArrowLeftRight size={18} />} title="Danh sách redirect"
      action={<BtnPrimary icon={<ArrowLeftRight size={14} />}>+ Thêm redirect</BtnPrimary>}>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>URL nguồn</th><th>URL đích</th><th>Loại</th><th>Lượt hit</th><th>Trạng thái</th></tr></thead>
          <tbody>
            {redirects.map(r => (
              <tr key={r.from}>
                <td><code className="adm-code-inline">{r.from}</code></td>
                <td><code className="adm-code-inline">{r.to}</code></td>
                <td><span className={`adm-badge ${r.type === '301' ? 'adm-badge-success' : 'adm-badge-warning'}`}>{r.type}</span></td>
                <td>{r.hits}</td>
                <td>
                  <span className={`adm-dot ${r.active ? 'adm-dot-on' : 'adm-dot-off'}`} />
                  <span style={{ fontWeight: 600, fontSize: 12, color: r.active ? T.success : T.mutedLight }}>{r.active ? 'Bật' : 'Tắt'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>

    <Card icon={<SlidersHorizontal size={18} />} title="Thêm redirect mới">
      <div className="adm-form-grid">
        <LabeledInput label="URL nguồn" value="/du-an-cu/ten-du-an" mono />
        <LabeledInput label="URL đích" value="/du-an/ten-du-an-moi" mono />
        <LabeledInput label="Loại chuyển hướng" value="301 — vĩnh viễn" />
        <LabeledInput label="Ghi chú" value="Đổi cấu trúc URL dự án" />
      </div>
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <BtnPrimary icon={<Save size={14} />}>Lưu redirect</BtnPrimary>
      </div>
    </Card>
  </div>
);

const ScriptsTab = () => (
  <div className="fade-in">
    <Card icon={<Code size={18} />} title="Custom Head Scripts"
      action={<span className="adm-badge" style={{ backgroundColor: T.infoBg, color: T.infoText }}>GTM, Search Console, Meta verify…</span>}>
      <label style={S.label}>Mã chèn vào &lt;head&gt;</label>
      <textarea rows={8} className="adm-input adm-textarea adm-mono"
        defaultValue={`<!-- Google Tag Manager -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];...})(window,document,'script','dataLayer','GTM-4UHOME88');</script>\n\n<!-- Google Search Console -->\n<meta name="google-site-verification" content="abc123" />`}
      />
    </Card>

    <Card icon={<Code size={18} />} title="Custom Body Scripts"
      action={<BtnPrimary icon={<Save size={14} />}>Lưu scripts</BtnPrimary>}>
      <label style={S.label}>Mã chèn trước &lt;/body&gt; (Chat, Analytics fallback…)</label>
      <textarea rows={8} className="adm-input adm-textarea adm-mono"
        defaultValue={`<!-- Zalo Chat Widget -->\n<div class="zalo-chat-widget" data-oaid="..." data-welcome-message="Xin chào!"></div>\n<script src="https://sp.zalo.me/plugins/sdk.js"></script>`}
      />
    </Card>
  </div>
);

const SettingsTab = () => (
  <div className="fade-in">
    <Card icon={<Settings size={18} />} title="Thông tin website"
      action={<BtnPrimary icon={<Save size={14} />}>Lưu thay đổi</BtnPrimary>}>
      <div className="adm-form-grid">
        <LabeledInput label="Tên thương hiệu" value="4U HOME" />
        <LabeledInput label="Tên miền chính" value="https://4uhome.vn" mono />
        <LabeledInput label="Hotline" value="0975.09.7777" />
        <LabeledInput label="Email nhận lead" value="contact@4uhome.vn" mono />
        <LabeledInput label="Địa chỉ showroom" value="Tầng 15, Tòa nhà Premium, TP.HCM" />
        <LabeledInput label="Zalo URL" value="https://zalo.me/0975097777" mono />
      </div>
    </Card>

    <Card icon={<ShieldCheck size={18} />} title="Checklist bàn giao admin">
      <FieldGroupGrid groups={[
        { title: 'Tài khoản', fields: ['Super admin', 'Admin nội dung', 'Tài khoản SEO/performance', 'Đổi mật khẩu khi bàn giao'] },
        { title: 'Dữ liệu', fields: ['Database/dữ liệu mẫu', 'Ảnh đã tối ưu', 'Danh sách redirect', 'Mã tracking đã cấu hình'] },
        { title: 'Hướng dẫn', fields: ['Cách thêm dự án', 'Cách đăng bài SEO', 'Cách tạo landing page', 'Cách kiểm tra lead/form'] },
      ]} />
    </Card>
  </div>
);

/* ═══════════════════════════════════════════════
   MAIN ADMIN SHELL
   ═══════════════════════════════════════════════ */

const AdminDemo = () => {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    const map: Record<TabId, ReactNode> = {
      dashboard: <DashboardTab />,
      banner: <BannerTab />,
      projects: <ProjectsTab />,
      blog: <BlogTab />,
      leads: <LeadsTab />,
      seo: <SeoTab />,
      redirects: <RedirectsTab />,
      scripts: <ScriptsTab />,
      settings: <SettingsTab />,
    };
    return map[activeTab];
  };

  const handleTabClick = (id: TabId) => {
    setActiveTab(id);
    setSidebarOpen(false);
  };

  return (
    <div className="adm-shell">
      {/* ── Sidebar overlay on mobile ── */}
      {sidebarOpen && <div className="adm-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`adm-sidebar ${sidebarOpen ? 'adm-sidebar--open' : ''}`}>
        <div className="adm-sidebar-brand">
          <div className="adm-brand-mark">4U</div>
          <div>
            <h2 className="adm-brand-name">4U HOME</h2>
            <p className="adm-brand-sub">CMS Admin Panel</p>
          </div>
          <button className="adm-sidebar-close" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="adm-sidebar-nav">
          <span className="adm-nav-section">Quản trị nội dung</span>
          {tabs.slice(0, 5).map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`adm-nav-item ${activeTab === tab.id ? 'adm-nav-item--active' : ''}`}
            >
              {tab.icon}
              <span className="adm-nav-label">{tab.name}</span>
              {tab.badge && <span className="adm-nav-badge">{tab.badge}</span>}
              {activeTab === tab.id && <ChevronRight size={14} className="adm-nav-arrow" />}
            </button>
          ))}
          <span className="adm-nav-section">Kỹ thuật & Cấu hình</span>
          {tabs.slice(5).map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`adm-nav-item ${activeTab === tab.id ? 'adm-nav-item--active' : ''}`}
            >
              {tab.icon}
              <span className="adm-nav-label">{tab.name}</span>
              {tab.badge && <span className="adm-nav-badge">{tab.badge}</span>}
              {activeTab === tab.id && <ChevronRight size={14} className="adm-nav-arrow" />}
            </button>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          <div className="adm-sidebar-footer-user">
            <div className="adm-avatar">AD</div>
            <div>
              <p className="adm-sidebar-footer-name">Admin Demo</p>
              <p className="adm-sidebar-footer-role">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="adm-main">
        {/* Top bar */}
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <button className="adm-hamburger" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="adm-breadcrumb">
              <span className="adm-breadcrumb-root">CMS</span>
              <ChevronRight size={14} className="adm-breadcrumb-sep" />
              <span className="adm-breadcrumb-current">{tabLabels[activeTab]}</span>
            </div>
          </div>
          <div className="adm-topbar-right">
            <div className="adm-search-box">
              <Search size={15} className="adm-search-icon" />
              <input type="text" placeholder="Tìm module, field…" className="adm-search-input" />
            </div>
            <span className="adm-demo-badge">
              <span className="adm-demo-dot" />
              Demo CMS
            </span>
            <button className="adm-topbar-icon" title="Thông báo">
              <Bell size={18} />
            </button>
            <a href="/" className="adm-btn adm-btn-outline-sm">
              <ExternalLink size={14} />
              <span>Xem website</span>
            </a>
          </div>
        </header>

        {/* Content */}
        <div className="adm-content">
          {renderContent()}
        </div>
      </div>

      <style>{adminCSS}</style>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   ADMIN CSS
   ═══════════════════════════════════════════════ */

const adminCSS = `
/* ─── Shell layout ─── */
.adm-shell {
  display: flex;
  min-height: 100vh;
  background: ${T.bg};
  font-family: ${T.font};
  position: relative;
}

/* ─── Sidebar ─── */
.adm-sidebar {
  width: 260px;
  background: ${T.navyDeep};
  color: #fff;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
}
.adm-sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 20px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.adm-brand-mark {
  width: 38px; height: 38px;
  background: linear-gradient(135deg, ${T.gold}, ${T.goldDark});
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 14; color: #fff;
  letter-spacing: 1px;
  flex-shrink: 0;
}
.adm-brand-name {
  font-size: 15px; font-weight: 700; margin: 0;
  letter-spacing: 1.5px; color: #fff;
}
.adm-brand-sub {
  font-size: 11px; color: rgba(255,255,255,0.45); margin: 2px 0 0;
}
.adm-sidebar-close {
  display: none;
  margin-left: auto;
  background: none; border: none; color: rgba(255,255,255,0.5); cursor: pointer; padding: 4px;
}

/* ─── Sidebar nav ─── */
.adm-sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0 16px;
}
.adm-nav-section {
  display: block;
  padding: 16px 20px 6px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
}
.adm-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.65);
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  font-family: ${T.font};
  transition: all 0.18s ease;
  position: relative;
}
.adm-nav-item:hover {
  color: #fff;
  background: rgba(255,255,255,0.06);
}
.adm-nav-item--active {
  color: #fff !important;
  background: rgba(200,165,92,0.15) !important;
  font-weight: 600;
}
.adm-nav-item--active::before {
  content: '';
  position: absolute;
  left: 0; top: 4px; bottom: 4px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: ${T.gold};
}
.adm-nav-label { flex: 1; }
.adm-nav-badge {
  font-size: 10px; font-weight: 700;
  background: ${T.gold};
  color: ${T.navyDeep};
  min-width: 20px; height: 20px;
  border-radius: 10px;
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0 6px;
}
.adm-nav-arrow {
  opacity: 0.5;
}

/* ─── Sidebar footer ─── */
.adm-sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.adm-sidebar-footer-user {
  display: flex; align-items: center; gap: 10px;
}
.adm-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${T.gold}, ${T.goldDark});
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: #fff;
  flex-shrink: 0;
}
.adm-sidebar-footer-name {
  font-size: 13px; font-weight: 600; color: #fff; margin: 0;
}
.adm-sidebar-footer-role {
  font-size: 11px; color: rgba(255,255,255,0.4); margin: 2px 0 0;
}

/* ─── Main area ─── */
.adm-main {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* ─── Top bar ─── */
.adm-topbar {
  height: 56px;
  background: #fff;
  border-bottom: 1px solid ${T.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 50;
  flex-shrink: 0;
}
.adm-topbar-left {
  display: flex; align-items: center; gap: 12px; min-width: 0;
}
.adm-topbar-right {
  display: flex; align-items: center; gap: 12px;
}
.adm-hamburger {
  display: none;
  background: none; border: none; color: ${T.navy}; cursor: pointer; padding: 4px;
}

/* Breadcrumb */
.adm-breadcrumb {
  display: flex; align-items: center; gap: 6px; font-size: 13px; min-width: 0;
}
.adm-breadcrumb-root {
  color: ${T.mutedLight}; font-weight: 500;
}
.adm-breadcrumb-sep {
  color: ${T.border}; flex-shrink: 0;
}
.adm-breadcrumb-current {
  color: ${T.navy}; font-weight: 600;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* Search */
.adm-search-box {
  position: relative;
  display: flex; align-items: center;
}
.adm-search-icon {
  position: absolute; left: 10px; color: ${T.mutedLight}; pointer-events: none;
}
.adm-search-input {
  width: 200px;
  padding: 7px 12px 7px 32px;
  border: 1px solid ${T.border};
  border-radius: 8px;
  font-size: 12px;
  font-family: ${T.font};
  background: ${T.bgAlt};
  outline: none;
  transition: border-color 0.2s, width 0.3s;
}
.adm-search-input:focus {
  border-color: ${T.gold};
  width: 260px;
  background: #fff;
}

/* Demo badge */
.adm-demo-badge {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 700;
  color: ${T.successText};
  background: ${T.successBg};
  padding: 5px 12px;
  border-radius: 20px;
  letter-spacing: 0.3px;
}
.adm-demo-dot {
  width: 6px; height: 6px;
  background: ${T.success};
  border-radius: 50%;
  animation: adm-pulse 2s ease-in-out infinite;
}
@keyframes adm-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.adm-topbar-icon {
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid ${T.border};
  border-radius: 8px;
  background: #fff;
  color: ${T.muted};
  cursor: pointer;
  transition: all 0.18s;
}
.adm-topbar-icon:hover {
  background: ${T.bgAlt};
  color: ${T.navy};
}

/* ─── Buttons ─── */
.adm-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px;
  font-size: 12px; font-weight: 600;
  font-family: ${T.font};
  border-radius: ${T.radiusSm}px;
  cursor: pointer;
  transition: all 0.18s ease;
  border: none;
  white-space: nowrap;
}
.adm-btn-primary {
  background: ${T.gold};
  color: #fff;
}
.adm-btn-primary:hover {
  background: ${T.goldDark};
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(200,165,92,0.35);
}
.adm-btn-secondary {
  background: transparent;
  border: 1px solid ${T.border};
  color: ${T.navy};
}
.adm-btn-secondary:hover {
  background: ${T.bgAlt};
  border-color: ${T.mutedLight};
}
.adm-btn-outline-sm {
  padding: 6px 12px;
  border: 1px solid ${T.border};
  border-radius: ${T.radiusSm}px;
  background: transparent;
  color: ${T.navy};
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}
.adm-btn-outline-sm:hover {
  background: ${T.bgAlt};
}
.adm-btn-group {
  display: flex; gap: 8px; align-items: center;
}

/* ─── Content area ─── */
.adm-content {
  flex: 1;
  padding: 28px;
  overflow-x: hidden;
  min-width: 0;
}

/* ─── Stat cards ─── */
.adm-stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
.adm-stat {
  background: #fff;
  border: 1px solid ${T.border};
  border-radius: ${T.radius}px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  transition: box-shadow 0.2s, transform 0.2s;
}
.adm-stat:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  transform: translateY(-2px);
}
.adm-stat-icon {
  width: 42px; height: 42px;
  border-radius: 10px;
  background: ${T.goldSoft};
  color: ${T.gold};
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.adm-stat-info { flex: 1; min-width: 0; }
.adm-stat-value {
  display: block;
  font-size: 24px;
  font-weight: 800;
  color: ${T.navy};
  line-height: 1.1;
}
.adm-stat-label {
  display: block;
  font-size: 12px;
  color: ${T.muted};
  margin-top: 2px;
}
.adm-stat-trend {
  display: inline-flex; align-items: center; gap: 3px;
  font-size: 11px; font-weight: 700;
  color: ${T.success};
  background: ${T.successBg};
  padding: 3px 8px;
  border-radius: 12px;
  white-space: nowrap;
  align-self: flex-start;
}

/* ─── Cards ─── */
.adm-card {
  background: #fff;
  border: 1px solid ${T.border};
  border-radius: ${T.radius}px;
  margin-bottom: 20px;
  overflow: hidden;
}
.adm-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px;
  border-bottom: 1px solid ${T.borderLight};
  gap: 12px;
  flex-wrap: wrap;
}
.adm-card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: ${T.navy};
  margin: 0;
}
.adm-card-icon {
  color: ${T.gold};
  display: flex;
  flex-shrink: 0;
}
.adm-card-action { flex-shrink: 0; }
.adm-card-body { padding: 22px; }

/* ─── Tables ─── */
.adm-table-wrap {
  overflow-x: auto;
  margin: -4px -4px;
  padding: 4px;
}
.adm-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  min-width: 640px;
}
.adm-table th {
  padding: 10px 12px;
  text-align: left;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${T.muted};
  background: ${T.bgAlt};
  border-bottom: 1px solid ${T.border};
  white-space: nowrap;
}
.adm-table td {
  padding: 12px;
  border-bottom: 1px solid ${T.borderLight};
  vertical-align: top;
  color: ${T.navyLight};
  line-height: 1.55;
}
.adm-table tbody tr {
  transition: background 0.15s;
}
.adm-table tbody tr:hover {
  background: ${T.bgAlt};
}
.adm-table tbody tr:last-child td {
  border-bottom: none;
}

/* ─── Forms ─── */
.adm-form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.adm-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${T.border};
  border-radius: ${T.radiusSm}px;
  font-size: 13px;
  font-family: ${T.font};
  background: #fff;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  color: ${T.navy};
}
.adm-input:focus {
  border-color: ${T.gold};
  box-shadow: 0 0 0 3px rgba(200,165,92,0.12);
}
.adm-textarea {
  resize: vertical;
  line-height: 1.6;
}
.adm-mono {
  font-family: ${T.mono} !important;
  font-size: 12px !important;
  background: ${T.bgAlt} !important;
}

/* ─── Field group grid ─── */
.adm-field-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.adm-field-card {
  border: 1px solid ${T.border};
  border-radius: 8px;
  padding: 18px;
  background: #fff;
  transition: box-shadow 0.2s;
}
.adm-field-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.adm-field-card-title {
  font-size: 13px;
  font-weight: 700;
  color: ${T.navy};
  margin: 0 0 14px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${T.goldSoft};
}
.adm-check-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  margin: 0; padding: 0;
}
.adm-check-list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12px;
  color: ${T.muted};
  line-height: 1.5;
}
.adm-check-icon {
  color: ${T.gold};
  flex-shrink: 0;
  margin-top: 1px;
}

/* ─── Workflow ─── */
.adm-workflow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.adm-wf-step {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.adm-wf-num {
  width: 30px; height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${T.gold}, ${T.goldDark});
  color: #fff;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 800;
  flex-shrink: 0;
}
.adm-wf-step strong {
  display: block;
  font-size: 13px;
  color: ${T.navy};
}
.adm-wf-step p {
  font-size: 12px;
  color: ${T.muted};
  margin-top: 3px;
  line-height: 1.5;
}

/* ─── Badges ─── */
.adm-badge {
  display: inline-flex;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.2px;
}
.adm-badge-success {
  background: ${T.successBg} !important;
  color: ${T.successText} !important;
}
.adm-badge-warning {
  background: ${T.warningBg} !important;
  color: ${T.warningText} !important;
}

/* ─── Misc ─── */
.adm-code-inline {
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.navy};
  background: ${T.bgAlt};
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid ${T.borderLight};
  word-break: break-all;
}
.adm-code-tag {
  display: inline-block;
  font-family: ${T.mono};
  font-size: 12px;
  color: ${T.navy};
  background: ${T.goldSoft};
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 8px;
  font-weight: 600;
}
.adm-event-card {
  border: 1px solid ${T.border};
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  transition: box-shadow 0.2s;
}
.adm-event-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.adm-event-trigger {
  font-size: 13px; font-weight: 600; color: ${T.navy}; margin: 0;
}
.adm-event-platform {
  font-size: 11px; color: ${T.muted}; margin: 4px 0 0;
}

.adm-dot {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  margin-right: 6px;
  vertical-align: middle;
}
.adm-dot-on { background: ${T.success}; }
.adm-dot-off { background: ${T.mutedLight}; }

.adm-overlay {
  display: none;
}

/* ═══════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════ */

/* Large tablet / small desktop */
@media (max-width: 1200px) {
  .adm-stats-row { grid-template-columns: repeat(2, 1fr); }
  .adm-workflow { grid-template-columns: repeat(2, 1fr); }
  .adm-field-grid { grid-template-columns: repeat(2, 1fr); }
  .adm-search-input { width: 160px; }
  .adm-search-input:focus { width: 200px; }
}

/* Tablet */
@media (max-width: 900px) {
  .adm-sidebar {
    transform: translateX(-100%);
  }
  .adm-sidebar--open {
    transform: translateX(0);
    box-shadow: 4px 0 24px rgba(0,0,0,0.3);
  }
  .adm-sidebar-close { display: block; }
  .adm-main { margin-left: 0; }
  .adm-hamburger { display: flex; }
  .adm-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 90;
  }
  .adm-content { padding: 20px; }
  .adm-topbar { padding: 0 16px; }
  .adm-demo-badge { display: none; }
}

/* Phone */
@media (max-width: 640px) {
  .adm-stats-row { grid-template-columns: 1fr; }
  .adm-form-grid { grid-template-columns: 1fr; }
  .adm-field-grid { grid-template-columns: 1fr; }
  .adm-workflow { grid-template-columns: 1fr; }
  .adm-content { padding: 16px; }
  .adm-card-body { padding: 16px; }
  .adm-card-head { padding: 14px 16px; }
  .adm-topbar { height: 50px; padding: 0 12px; }
  .adm-search-box { display: none; }
  .adm-btn-outline-sm span { display: none; }
  .adm-card-head { flex-direction: column; align-items: flex-start; }
  .adm-breadcrumb-current { max-width: 180px; }
}

@media (max-width: 390px) {
  .adm-content { padding: 12px; }
  .adm-card-body { padding: 14px; }
  .adm-stat { padding: 14px; gap: 10px; }
  .adm-stat-value { font-size: 20px; }
  .adm-stat-icon { width: 36px; height: 36px; }
  .adm-wf-step { gap: 8px; }
  .adm-breadcrumb { font-size: 12px; }
}
`;

export default AdminDemo;
