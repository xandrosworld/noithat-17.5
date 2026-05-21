// Custom SVG icons matching the reference site style (orange filled, construction/interior theme)
const s = { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' } as const;
const c = '#E8913A';

export const SvgBuilding = () => (<svg {...s}><path d="M12 6h16v28H12V6z" stroke={c} strokeWidth="2"/><path d="M16 10h3v4h-3zM21 10h3v4h-3zM16 18h3v4h-3zM21 18h3v4h-3zM17 28h6v6h-6z" fill={c}/><path d="M8 34h24" stroke={c} strokeWidth="2"/><path d="M20 2l-10 4h20l-10-4z" fill={c} opacity="0.3"/></svg>);

export const SvgLightbulb = () => (<svg {...s}><circle cx="20" cy="16" r="8" stroke={c} strokeWidth="2"/><path d="M16 24h8v3h-8z" fill={c}/><path d="M17 27h6v2h-6z" fill={c} opacity="0.5"/><path d="M20 6v-2M28 10l2-2M12 10l-2-2M30 18h2M8 18h-2" stroke={c} strokeWidth="1.5"/><path d="M17 14l3 4 3-4" stroke={c} strokeWidth="1.5" fill={c} opacity="0.3"/></svg>);

export const SvgHands = () => (<svg {...s}><path d="M10 20c2-4 4-6 10-6s8 2 10 6l-4 10H14L10 20z" stroke={c} strokeWidth="2"/><circle cx="20" cy="10" r="3" fill={c}/><path d="M14 8l-2-2M26 8l2-2M20 6V4" stroke={c} strokeWidth="1.5"/><path d="M15 22h10" stroke={c} strokeWidth="1"/></svg>);

export const SvgTeam = () => (<svg {...s}><circle cx="20" cy="10" r="4" stroke={c} strokeWidth="2"/><circle cx="10" cy="14" r="3" stroke={c} strokeWidth="1.5"/><circle cx="30" cy="14" r="3" stroke={c} strokeWidth="1.5"/><path d="M14 22c0-3 3-5 6-5s6 2 6 5v6H14v-6z" fill={c} opacity="0.3" stroke={c} strokeWidth="2"/><path d="M6 24c0-2 2-4 4-4s3 1 4 2" stroke={c} strokeWidth="1.5"/><path d="M30 22c1-1 2-2 4-2s4 2 4 4" stroke={c} strokeWidth="1.5"/></svg>);

// Commitment icons
export const SvgShield = () => (<svg {...s}><path d="M20 4L6 10v10c0 8 6 14 14 16 8-2 14-8 14-16V10L20 4z" stroke={c} strokeWidth="2" fill={c} fillOpacity="0.1"/><path d="M16 20l3 3 6-7" stroke={c} strokeWidth="2.5"/></svg>);

export const SvgCheck = () => (<svg {...s}><rect x="8" y="8" width="24" height="24" rx="4" stroke={c} strokeWidth="2" fill={c} fillOpacity="0.1"/><path d="M14 20l4 4 8-9" stroke={c} strokeWidth="2.5"/></svg>);

export const SvgPhone2 = () => (<svg {...s}><path d="M10 8c0-1 1-2 2-2h4l2 6-3 2c2 4 5 7 9 9l2-3 6 2v4c0 1-1 2-2 2C16 36 4 24 4 10c0-1 1-2 2-2h4z" stroke={c} strokeWidth="2" fill={c} fillOpacity="0.1"/></svg>);

export const SvgMoney = () => (<svg {...s}><rect x="4" y="10" width="32" height="20" rx="3" stroke={c} strokeWidth="2"/><circle cx="20" cy="20" r="5" stroke={c} strokeWidth="2"/><path d="M19 18v5M18 19h4M18 21h3" stroke={c} strokeWidth="1.2"/></svg>);

export const SvgClipboard = () => (<svg {...s}><rect x="8" y="6" width="24" height="28" rx="3" stroke={c} strokeWidth="2"/><path d="M14 6V4h12v2" stroke={c} strokeWidth="2"/><path d="M14 16h12M14 22h8M14 28h10" stroke={c} strokeWidth="1.5" opacity="0.6"/></svg>);

export const SvgPaint = () => (<svg {...s}><path d="M8 8h24v12c0 2-2 4-4 4H12c-2 0-4-2-4-4V8z" stroke={c} strokeWidth="2"/><path d="M18 24v8h4v-8" stroke={c} strokeWidth="2"/><circle cx="14" cy="14" r="2" fill={c}/><circle cx="20" cy="12" r="2" fill={c}/><circle cx="26" cy="14" r="2" fill={c}/></svg>);

export const SvgClock = () => (<svg {...s}><circle cx="20" cy="20" r="14" stroke={c} strokeWidth="2"/><path d="M20 10v10l6 4" stroke={c} strokeWidth="2.5"/><circle cx="20" cy="20" r="2" fill={c}/></svg>);

export const SvgTrophy = () => (<svg {...s}><path d="M12 6h16v10c0 5-4 8-8 8s-8-3-8-8V6z" stroke={c} strokeWidth="2" fill={c} fillOpacity="0.1"/><path d="M12 10H6c0 5 3 7 6 7M28 10h6c0 5-3 7-6 7" stroke={c} strokeWidth="2"/><path d="M16 30h8M20 24v6" stroke={c} strokeWidth="2"/></svg>);

export const SvgWorker = () => (<svg {...s}><circle cx="20" cy="14" r="5" stroke={c} strokeWidth="2"/><path d="M12 12h16v-2c0-1-3-4-8-4s-8 3-8 4v2z" fill={c} opacity="0.3"/><path d="M10 34c0-6 5-10 10-10s10 4 10 10" stroke={c} strokeWidth="2"/></svg>);

// Service icons  
export const SvgDesign = () => (<svg {...s}><path d="M6 6h20l8 8v20H6V6z" stroke={c} strokeWidth="2"/><path d="M26 6v8h8" stroke={c} strokeWidth="2"/><path d="M12 18l4 4-4 4M18 26h8" stroke={c} strokeWidth="2"/></svg>);

export const SvgConstruct = () => (<svg {...s}><path d="M4 36l12-12M24 12l-6 6" stroke={c} strokeWidth="3"/><rect x="22" y="4" width="14" height="10" rx="2" stroke={c} strokeWidth="2" transform="rotate(45 29 9)" fill={c} fillOpacity="0.15"/><circle cx="30" cy="30" r="6" stroke={c} strokeWidth="2"/><path d="M28 30h4M30 28v4" stroke={c} strokeWidth="1.5"/></svg>);

export const SvgPackage2 = () => (<svg {...s}><rect x="6" y="12" width="28" height="22" rx="2" stroke={c} strokeWidth="2"/><path d="M6 18h28M20 12v22" stroke={c} strokeWidth="2"/><path d="M14 6h12l4 6H10l4-6z" stroke={c} strokeWidth="2" fill={c} fillOpacity="0.15"/></svg>);

export const SvgRefresh = () => (<svg {...s}><path d="M6 20a14 14 0 0126-7" stroke={c} strokeWidth="2.5"/><path d="M34 20a14 14 0 01-26 7" stroke={c} strokeWidth="2.5"/><path d="M30 8l4 6-6 1" fill={c}/><path d="M10 32l-4-6 6-1" fill={c}/></svg>);

// Partner SVG logos (simplified versions)
export const LogoJotun = () => (<svg width="120" height="40" viewBox="0 0 120 40"><text x="10" y="28" fontFamily="serif" fontWeight="900" fontSize="24" fill="#1B365D" fontStyle="italic">JOTUN</text><rect x="90" y="8" width="20" height="24" rx="2" fill="#1B365D" opacity="0.15"/></svg>);

export const LogoHafele = () => (<svg width="120" height="40" viewBox="0 0 120 40"><text x="5" y="27" fontFamily="sans-serif" fontWeight="800" fontSize="20" fill="#E30613" letterSpacing="2">Häfele</text></svg>);

export const LogoInax = () => (<svg width="120" height="40" viewBox="0 0 120 40"><text x="15" y="28" fontFamily="sans-serif" fontWeight="900" fontSize="24" fill="#003DA5" letterSpacing="1">INAX</text></svg>);

export const LogoMPE = () => (<svg width="120" height="40" viewBox="0 0 120 40"><rect x="10" y="6" width="28" height="28" rx="14" fill="#0066B3" opacity="0.15"/><text x="10" y="28" fontFamily="sans-serif" fontWeight="900" fontSize="26" fill="#0066B3">MPE</text></svg>);

export const LogoBlum = () => (<svg width="120" height="40" viewBox="0 0 120 40"><text x="10" y="28" fontFamily="sans-serif" fontWeight="900" fontSize="24" fill="#FF6600">BLUM</text></svg>);

export const LogoInsee = () => (<svg width="120" height="40" viewBox="0 0 120 40"><text x="5" y="28" fontFamily="sans-serif" fontWeight="800" fontSize="22" fill="#006838">INSEE</text></svg>);

export const LogoPanasonic = () => (<svg width="140" height="40" viewBox="0 0 140 40"><text x="5" y="27" fontFamily="sans-serif" fontWeight="700" fontSize="18" fill="#003087">Panasonic</text></svg>);

export const LogoToto = () => (<svg width="120" height="40" viewBox="0 0 120 40"><text x="15" y="28" fontFamily="serif" fontWeight="900" fontSize="24" fill="#003E7E" letterSpacing="3">TOTO</text></svg>);
