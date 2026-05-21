import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SvgBuilding, SvgLightbulb, SvgHands, SvgTeam, SvgShield, SvgCheck, SvgPhone2, SvgMoney, SvgClipboard, SvgPaint, SvgClock, SvgTrophy, SvgWorker, SvgDesign, SvgConstruct, SvgPackage2, SvgRefresh, LogoJotun, LogoHafele, LogoInax, LogoMPE, LogoBlum, LogoInsee, LogoPanasonic, LogoToto } from '../components/SvgIcons';

const C = { teal: '#0D3B2E', tl: '#145542', gold: '#C8A55C', or: '#E8913A', w: '#fff' };
const lift = (e: React.MouseEvent, up: boolean) => {
  const t = e.currentTarget as HTMLElement;
  t.style.transform = up ? 'translateY(-8px)' : '';
  t.style.boxShadow = up ? '0 16px 40px rgba(0,0,0,0.25)' : '';
};

const Home = () => {
  const [hp, setHp] = useState<number|null>(null);
  const [slide, setSlide] = useState(0);
  const heroSlides = [
    { img: '/assets/generated/hero_interior_living_room.png', title: 'Thiết Kế Nội Thất', sub: 'Uy Tín — Chuyên Nghiệp — Phụng Sự' },
    { img: '/assets/generated/luxury_bedroom_interior.png', title: 'Nội Thất Biệt Thự', sub: 'Sang Trọng — Đẳng Cấp — Tinh Tế' },
    { img: '/assets/generated/premium_kitchen_interior.png', title: 'Thi Công Trọn Gói', sub: 'Chất Lượng — Đúng Hẹn — Minh Bạch' },
  ];
  const nextSlide = useCallback(() => setSlide(s => (s + 1) % heroSlides.length), [heroSlides.length]);
  const prevSlide = () => setSlide(s => (s - 1 + heroSlides.length) % heroSlides.length);
  useEffect(() => { const t = setInterval(nextSlide, 5000); return () => clearInterval(t); }, [nextSlide]);
  return (<div>
    {/* HERO SLIDESHOW */}
    <section style={{position:'relative',height:'85vh',minHeight:550,maxHeight:700,overflow:'hidden'}}>
      {heroSlides.map((h,i)=>(<img key={i} src={h.img} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:slide===i?1:0,transition:'opacity 0.8s ease-in-out'}}/>))}
      <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(13,59,46,0.88) 0%,rgba(13,59,46,0.55) 50%,rgba(0,0,0,0.3) 100%)'}}/>
      {/* Arrows */}
      <button onClick={prevSlide} style={{position:'absolute',left:20,top:'50%',transform:'translateY(-50%)',width:48,height:48,borderRadius:'50%',border:'2px solid rgba(255,255,255,0.3)',backgroundColor:'rgba(0,0,0,0.25)',color:'#fff',fontSize:22,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',zIndex:2,transition:'all 0.3s',backdropFilter:'blur(4px)'}} onMouseEnter={e=>{e.currentTarget.style.backgroundColor='rgba(200,165,92,0.6)';e.currentTarget.style.borderColor=C.gold;}} onMouseLeave={e=>{e.currentTarget.style.backgroundColor='rgba(0,0,0,0.25)';e.currentTarget.style.borderColor='rgba(255,255,255,0.3)';}}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button onClick={nextSlide} style={{position:'absolute',right:20,top:'50%',transform:'translateY(-50%)',width:48,height:48,borderRadius:'50%',border:'2px solid rgba(255,255,255,0.3)',backgroundColor:'rgba(0,0,0,0.25)',color:'#fff',fontSize:22,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',zIndex:2,transition:'all 0.3s',backdropFilter:'blur(4px)'}} onMouseEnter={e=>{e.currentTarget.style.backgroundColor='rgba(200,165,92,0.6)';e.currentTarget.style.borderColor=C.gold;}} onMouseLeave={e=>{e.currentTarget.style.backgroundColor='rgba(0,0,0,0.25)';e.currentTarget.style.borderColor='rgba(255,255,255,0.3)';}}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {/* Dots */}
      <div style={{position:'absolute',bottom:110,left:'50%',transform:'translateX(-50%)',display:'flex',gap:10,zIndex:2}}>
        {heroSlides.map((_,i)=>(<button key={i} onClick={()=>setSlide(i)} style={{width:slide===i?28:10,height:10,borderRadius:5,border:'none',backgroundColor:slide===i?C.gold:'rgba(255,255,255,0.4)',cursor:'pointer',transition:'all 0.3s'}}/>))}
      </div>
      <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'0 0 56px'}}>
        <div style={{maxWidth:1320,margin:'0 auto',padding:'0 40px'}}>
          <p style={{color:'rgba(255,255,255,0.65)',fontSize:14,letterSpacing:3,marginBottom:12,textTransform:'uppercase'}}>Thiết kế nội thất &nbsp;·&nbsp; Thi công nội thất &nbsp;·&nbsp; Nội thất trọn gói</p>
          <h1 style={{fontSize:'clamp(2.2rem,5vw,3.5rem)',color:C.w,fontWeight:800,lineHeight:1.15,marginBottom:28}}>
            <span style={{color:C.gold}}>{heroSlides[slide].title}</span>
          </h1>
          <p style={{color:'rgba(255,255,255,0.75)',fontSize:'clamp(1.1rem,2.5vw,1.6rem)',fontWeight:600,marginBottom:28,fontStyle:'italic'}}>{heroSlides[slide].sub}</p>
          <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
            <Link to="/lien-he" style={{padding:'15px 36px',backgroundColor:C.gold,color:C.w,fontWeight:700,fontSize:14,borderRadius:4}}>Nhận tư vấn miễn phí</Link>
            <Link to="/du-an" style={{padding:'15px 36px',border:'2px solid rgba(255,255,255,0.35)',color:C.w,fontWeight:600,fontSize:14,borderRadius:4,backdropFilter:'blur(4px)'}}>Xem dự án</Link>
          </div>
        </div>
      </div>
    </section>

    {/* SERVICE BUTTONS */}
    <section style={{backgroundColor:C.teal,marginTop:-1}}>
      <div style={{maxWidth:1320,margin:'0 auto',padding:'0 40px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0}} className="svc-grid">
          {svcBtns.map((s,i)=>(<Link to="/dich-vu" key={i} style={{display:'flex',alignItems:'center',gap:16,padding:'26px 28px',border:`2px solid ${C.or}`,borderRight:i<3?'none':`2px solid ${C.or}`,color:C.w,transition:'all 0.3s',cursor:'pointer'}}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.or;e.currentTarget.style.transform='translateY(-4px)';}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.transform='';}}
          ><span style={{color:C.gold,flexShrink:0}}>{s.icon}</span><span style={{fontSize:14,fontWeight:700,textTransform:'uppercase',letterSpacing:0.5,lineHeight:1.3}}>{s.label}</span></Link>))}
        </div>
      </div>
    </section>

    {/* ABOUT — 3 CARDS */}
    <section style={{backgroundColor:C.teal,padding:'64px 0'}}>
      <div style={{maxWidth:1320,margin:'0 auto',padding:'0 40px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:24}} className="about-grid">
          {aboutCards.map((c,i)=>(<div key={i} style={{border:`2px solid ${C.or}`,borderRadius:12,overflow:'hidden',transition:'all 0.35s ease',cursor:'pointer'}} onMouseEnter={e=>lift(e,true)} onMouseLeave={e=>lift(e,false)}>
            <div style={{height:200,overflow:'hidden'}}><img src={c.img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
            <div style={{padding:24,backgroundColor:'rgba(20,85,66,0.5)'}}>
              <h3 style={{color:C.gold,fontSize:16,fontWeight:700,marginBottom:8}}>{c.title}</h3>
              <p style={{color:'rgba(255,255,255,0.65)',fontSize:13,lineHeight:1.6}}>{c.desc}</p>
            </div>
          </div>))}
        </div>
      </div>
    </section>

    {/* VALUES + STATS */}
    <section style={{backgroundColor:C.teal,padding:'64px 0'}}>
      <div style={{maxWidth:1320,margin:'0 auto',padding:'0 40px'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <p style={{color:C.gold,letterSpacing:3,fontSize:14,fontWeight:600,marginBottom:8}}>DẤU ẤN TẠO NÊN</p>
          <h2 style={{color:C.w,fontSize:'clamp(1.8rem,3vw,2.4rem)',fontWeight:800}}>4U HOME</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:32,alignItems:'start'}} className="val-grid">
          <div style={{position:'relative',borderRadius:12,overflow:'hidden',height:400,border:`2px solid ${C.or}`}}>
            <img src="/assets/generated/project_villa_exterior.png" alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
            <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.25)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{width:72,height:72,borderRadius:'50%',backgroundColor:C.gold,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',boxShadow:'0 0 0 12px rgba(200,165,92,0.3)',transition:'transform 0.3s'}}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.15)'} onMouseLeave={e=>e.currentTarget.style.transform=''}
              ><div style={{width:0,height:0,borderLeft:'22px solid #fff',borderTop:'13px solid transparent',borderBottom:'13px solid transparent',marginLeft:5}}/></div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            {vals.map((v,i)=>(<div key={i} style={{padding:22,border:`2px solid ${C.or}`,borderRadius:10,textAlign:'center',transition:'all 0.3s',cursor:'pointer'}} onMouseEnter={e=>lift(e,true)} onMouseLeave={e=>lift(e,false)}>
              <span style={{color:C.gold,display:'flex',justifyContent:'center',marginBottom:10}}>{v.icon}</span>
              <span style={{color:C.w,fontSize:13,fontWeight:700}}>{v.label}</span>
            </div>))}
            {statData.map((s,i)=>(<div key={i} style={{padding:18,border:`2px solid ${C.or}`,borderRadius:10,textAlign:'center',transition:'all 0.3s',cursor:'default'}} onMouseEnter={e=>lift(e,true)} onMouseLeave={e=>lift(e,false)}>
              <div style={{color:C.or,fontSize:34,fontWeight:800,lineHeight:1}}>{s.num}</div>
              <div style={{color:'rgba(255,255,255,0.55)',fontSize:11,marginTop:6}}>{s.label}</div>
            </div>))}
          </div>
        </div>
      </div>
    </section>

    {/* PROJECTS */}
    <section style={{backgroundColor:C.teal,padding:'64px 0'}}>
      <div style={{maxWidth:1320,margin:'0 auto',padding:'0 40px'}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <p style={{color:'rgba(255,255,255,0.45)',letterSpacing:3,fontSize:14,marginBottom:8}}>CÔNG TRÌNH THỰC TẾ</p>
          <h2 style={{color:C.w,fontSize:'clamp(1.8rem,3vw,2.4rem)',fontWeight:800}}>4U HOME</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}} className="proj-grid">
          {projects.map((p,i)=>(<Link to={`/du-an/${p.id}`} key={i} onMouseEnter={()=>setHp(i)} onMouseLeave={()=>setHp(null)}
            style={{position:'relative',borderRadius:12,overflow:'hidden',height:280,display:'block',border:`2px solid ${C.or}`,transition:'all 0.35s',transform:hp===i?'translateY(-8px)':'',boxShadow:hp===i?'0 16px 40px rgba(0,0,0,0.3)':''}}>
            <img src={p.img} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.6s',transform:hp===i?'scale(1.06)':'scale(1)'}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 50%)'}}/>
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:22}}>
              <span style={{color:C.gold,fontSize:11,fontWeight:600,letterSpacing:1.5,textTransform:'uppercase'}}>{p.cat}</span>
              <h3 style={{color:C.w,fontSize:16,fontWeight:700,marginTop:4}}>{p.title}</h3>
              <span style={{color:'rgba(255,255,255,0.55)',fontSize:12}}>{p.area}</span>
            </div>
          </Link>))}
        </div>
        <div style={{textAlign:'center',marginTop:32}}><Link to="/du-an" style={{display:'inline-flex',alignItems:'center',gap:8,color:C.gold,fontWeight:600,fontSize:14}}>Xem tất cả dự án <ArrowRight size={16}/></Link></div>
      </div>
    </section>

    {/* COMMITMENTS */}
    <section style={{position:'relative',padding:'80px 0',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0}}><img src="/assets/generated/project_villa_exterior.png" alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/><div style={{position:'absolute',inset:0,backgroundColor:'rgba(13,59,46,0.93)'}}/></div>
      <div style={{position:'relative',zIndex:1,maxWidth:1320,margin:'0 auto',padding:'0 40px'}}>
        <div style={{marginBottom:48}}><p style={{color:'rgba(255,255,255,0.45)',fontSize:18,fontStyle:'italic'}}>CAM KẾT</p><h2 style={{color:C.w,fontSize:'clamp(1.8rem,3vw,2.4rem)',fontWeight:800}}>CỦA <span style={{color:C.gold}}>4U HOME</span></h2></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}} className="cm-grid">
          {commits.map((c,i)=>(<div key={i} style={{display:'flex',gap:16,alignItems:'flex-start',padding:20,borderRadius:10,border:'1px solid rgba(255,255,255,0.08)',transition:'all 0.3s',cursor:'default'}} onMouseEnter={e=>{e.currentTarget.style.backgroundColor='rgba(255,255,255,0.06)';e.currentTarget.style.borderColor=C.or;lift(e,true);}} onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';lift(e,false);}}>
            <span style={{color:C.gold,flexShrink:0,marginTop:2}}>{c.icon}</span>
            <div><h4 style={{color:C.gold,fontSize:14,fontWeight:700,marginBottom:6,textTransform:'uppercase'}}>{c.title}</h4><p style={{color:'rgba(255,255,255,0.55)',fontSize:13,lineHeight:1.6}}>{c.text}</p></div>
          </div>))}
        </div>
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section style={{backgroundColor:C.teal,padding:'64px 0'}}>
      <div style={{maxWidth:1320,margin:'0 auto',padding:'0 40px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:40,flexWrap:'wrap',gap:16}}>
          <h2 style={{color:C.w,fontSize:'clamp(1.6rem,3vw,2rem)',fontWeight:800}}>CẢM NHẬN <span style={{color:C.gold,fontWeight:400,fontStyle:'italic'}}>của khách hàng</span></h2>
          <Link to="/du-an" style={{color:C.gold,fontSize:14,fontWeight:600,display:'flex',alignItems:'center',gap:6}}>Xem thêm <ArrowRight size={14}/></Link>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}} className="test-grid">
          {testis.map((t,i)=>(<div key={i} style={{border:`2px solid ${C.or}`,borderRadius:12,overflow:'hidden',transition:'all 0.35s'}} onMouseEnter={e=>lift(e,true)} onMouseLeave={e=>lift(e,false)}>
            <div style={{position:'relative',height:220,overflow:'hidden'}}>
              <img src={t.img} alt={t.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{width:52,height:52,borderRadius:'50%',backgroundColor:C.gold,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 0 8px rgba(200,165,92,0.25)'}}>
                  <div style={{width:0,height:0,borderLeft:'16px solid #fff',borderTop:'9px solid transparent',borderBottom:'9px solid transparent',marginLeft:3}}/>
                </div>
              </div>
            </div>
            <div style={{padding:20}}><p style={{color:C.gold,fontSize:11,fontWeight:600,letterSpacing:1,textTransform:'uppercase',marginBottom:4}}>CHỦ ĐẦU TƯ</p><h4 style={{color:C.w,fontSize:16,fontWeight:700,marginBottom:4}}>{t.name}</h4><p style={{color:'rgba(255,255,255,0.5)',fontSize:12,lineHeight:1.5}}>{t.project}</p></div>
          </div>))}
        </div>
      </div>
    </section>

    {/* PARTNERS MARQUEE */}
    <section style={{padding:'56px 0',background:`linear-gradient(to bottom,${C.teal} 0%,${C.tl} 100%)`,textAlign:'center',overflow:'hidden'}}>
      <div style={{maxWidth:1320,margin:'0 auto',padding:'0 40px'}}>
        <h2 style={{color:C.gold,fontSize:22,fontWeight:800,fontStyle:'italic',marginBottom:8}}>ĐỐI TÁC CỦA CHÚNG TÔI</h2>
        <p style={{color:'rgba(255,255,255,0.45)',fontSize:13,marginBottom:32}}>4U HOME luôn lựa chọn những đối tác uy tín trên thị trường</p>
      </div>
      <div style={{position:'relative',width:'100%',overflow:'hidden',maskImage:'linear-gradient(to right,transparent,black 10%,black 90%,transparent)',WebkitMaskImage:'linear-gradient(to right,transparent,black 10%,black 90%,transparent)'}}>
        <div className="marquee-track" style={{display:'flex',gap:32,width:'max-content'}}>
          {[...Array(3)].map((_,rep)=>partnerLogos.map((L,i)=>(<div key={`${rep}-${i}`} style={{padding:'14px 36px',backgroundColor:C.w,borderRadius:8,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',minWidth:150}}><L/></div>)))}
        </div>
      </div>
    </section>

    {/* CTA BAR */}
    <section style={{backgroundColor:C.gold,padding:'48px 0'}}>
      <div style={{maxWidth:1320,margin:'0 auto',padding:'0 40px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:24}}>
        <div><h2 style={{color:C.w,fontSize:24,fontWeight:800,marginBottom:4}}>Sẵn sàng kiến tạo không gian của bạn?</h2><p style={{color:'rgba(255,255,255,0.8)',fontSize:15}}>Liên hệ hotline <strong>0975.09.7777</strong> để nhận tư vấn miễn phí.</p></div>
        <div style={{display:'flex',gap:12}}>
          <a href="tel:0975097777" style={{padding:'14px 28px',backgroundColor:C.w,color:C.teal,fontWeight:700,fontSize:14,borderRadius:4,display:'flex',alignItems:'center',gap:8}}><Phone size={18}/> Gọi ngay</a>
          <Link to="/lien-he" style={{padding:'14px 28px',backgroundColor:C.teal,color:C.w,fontWeight:700,fontSize:14,borderRadius:4}}>Gửi yêu cầu</Link>
        </div>
      </div>
    </section>

    <style>{`
      @media(max-width:1024px){.svc-grid{grid-template-columns:repeat(2,1fr)!important;}.svc-grid>*{border-right:2px solid #E8913A!important;}.about-grid,.proj-grid,.cm-grid,.test-grid{grid-template-columns:repeat(2,1fr)!important;}.val-grid{grid-template-columns:1fr!important;}}
      @media(max-width:640px){.svc-grid,.about-grid,.proj-grid,.cm-grid,.test-grid{grid-template-columns:1fr!important;}}
    `}</style>
  </div>);
};

const svcBtns=[{icon:<SvgDesign/>,label:'Thiết kế nội thất'},{icon:<SvgConstruct/>,label:'Thi công nội thất'},{icon:<SvgPackage2/>,label:'Nội thất trọn gói'},{icon:<SvgRefresh/>,label:'Cải tạo không gian'}];
const aboutCards=[
  {img:'/assets/generated/project_office_modern.png',title:'GIỚI THIỆU 4U HOME',desc:'Với hơn 10 năm kinh nghiệm, 4U HOME tự hào là đơn vị thiết kế & thi công nội thất uy tín hàng đầu. Chúng tôi luôn lắng nghe và đồng hành cùng gia chủ.'},
  {img:'/assets/generated/premium_kitchen_interior.png',title:'TƯ VẤN CÙNG ĐỘI NGŨ 4U HOME',desc:'Bạn đang chuẩn bị kế hoạch thiết kế nội thất? Chia sẻ những tâm tư và ý tưởng tuyệt vời cho ngôi nhà tương lai, 4U HOME luôn lắng nghe bạn.'},
  {img:'/assets/generated/blog_interior_tips.png',title:'XU HƯỚNG NỘI THẤT 2026',desc:'Cập nhật các xu hướng thiết kế nội thất mới nhất, từ phong cách minimalist đến luxury modern, giúp bạn có lựa chọn phù hợp nhất.'},
];
const vals=[{icon:<SvgBuilding/>,label:'Tiên phong đổi mới'},{icon:<SvgLightbulb/>,label:'Sáng tạo thiết kế'},{icon:<SvgHands/>,label:'Tận tâm đam mê'},{icon:<SvgTeam/>,label:'Chuyên nghiệp chất lượng'}];
const partnerLogos = [LogoJotun, LogoHafele, LogoInax, LogoMPE, LogoBlum, LogoInsee, LogoPanasonic, LogoToto];
const statData=[{num:'500+',label:'Công trình hoàn thiện'},{num:'1200+',label:'Khách hàng hài lòng'},{num:'10+',label:'Năm kinh nghiệm'}];
const projects=[
  {id:1,img:'/assets/generated/luxury_bedroom_interior.png',title:'Biệt thự Vinhomes Riverside',cat:'Biệt thự',area:'320m² · Hà Nội'},
  {id:2,img:'/assets/generated/hero_interior_living_room.png',title:'Penthouse Landmark 81',cat:'Căn hộ',area:'180m² · TP.HCM'},
  {id:3,img:'/assets/generated/premium_kitchen_interior.png',title:'Nhà phố liền kề Sala',cat:'Nhà phố',area:'240m² · Quận 2'},
  {id:4,img:'/assets/generated/project_villa_exterior.png',title:'Villa nghỉ dưỡng Mũi Né',cat:'Villa',area:'450m² · Bình Thuận'},
  {id:5,img:'/assets/generated/project_office_modern.png',title:'Văn phòng Tech Startup',cat:'Văn phòng',area:'200m² · Q.1'},
  {id:6,img:'/assets/generated/blog_interior_tips.png',title:'Showroom Thời Trang V',cat:'Showroom',area:'160m² · Q.3'},
];
const commits=[
  {icon:<SvgShield/>,title:'Không bán thầu',text:'Cam kết không bán thầu, 4U HOME tự thiết kế & thi công.'},
  {icon:<SvgCheck/>,title:'Vật tư chất lượng',text:'Sử dụng đúng vật liệu trong hợp đồng, kiểm tra trước thi công.'},
  {icon:<SvgPhone2/>,title:'Tư vấn miễn phí',text:'Tư vấn, báo giá miễn phí, tận nơi, nhanh chóng.'},
  {icon:<SvgMoney/>,title:'Giá cả hợp lý',text:'Bảng giá minh bạch, cạnh tranh cho mọi phân khúc.'},
  {icon:<SvgClipboard/>,title:'Không phát sinh',text:'Cam kết không phát sinh chi phí ngoài hợp đồng.'},
  {icon:<SvgPaint/>,title:'Sáng tạo & thẩm mỹ',text:'Ý tưởng độc đáo, khác biệt, phù hợp yêu cầu.'},
  {icon:<SvgClock/>,title:'Đúng tiến độ',text:'Thi công đúng tiến độ, đảm bảo chất lượng thi công.'},
  {icon:<SvgTrophy/>,title:'Cam kết bảo hành',text:'Bảo hành công trình thi công dài hạn 2-5 năm.'},
  {icon:<SvgWorker/>,title:'Đội ngũ chuyên nghiệp',text:'KTS, kỹ sư, thợ tay nghề cao, dày dạn kinh nghiệm.'},
];
const testis=[
  {img:'/assets/generated/hero_interior_living_room.png',name:'Anh Nguyễn Văn Minh',project:'Dự án biệt thự 3 tầng tại Quận 9, TP.HCM'},
  {img:'/assets/generated/luxury_bedroom_interior.png',name:'Chị Trần Thị Hoa',project:'Dự án căn hộ Penthouse tại Landmark 81'},
  {img:'/assets/generated/premium_kitchen_interior.png',name:'Anh Lê Hoàng Phúc',project:'Dự án nhà phố liền kề Khu đô thị Sala, Q.2'},
];

export default Home;
