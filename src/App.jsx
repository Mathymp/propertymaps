import { useState, useEffect, useRef, useCallback } from 'react'

// ── Cloudinary — max enhancement ────────────────────────────
const CLD  = 'dysqraxnh'
const FLD  = 'mirador-nuble'
const T    = 'f_auto,q_auto:best,e_vibrance:100,e_saturation:90,e_contrast:50,e_sharpen:200,e_brightness:10'
const p    = (name, w = 1920) => `https://res.cloudinary.com/${CLD}/image/upload/${T},w_${w}/${FLD}/${name}`
const LOGO_W = `https://res.cloudinary.com/${CLD}/image/upload/f_auto,q_auto:best,w_500/${FLD}/logo-mirador-blanco.png`
const LOGO_G = `https://res.cloudinary.com/${CLD}/image/upload/f_auto,q_auto:best,w_500/${FLD}/logo-mirador-verde.png`
const VIDEO  = `https://res.cloudinary.com/${CLD}/video/upload/vc_h264,q_auto,w_1280/${FLD}/video-hero.mp4`

// ── Scroll reveal hook ───────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.1, rootMargin: '-20px 0px' })
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ── DATA ─────────────────────────────────────────────────────
const LOTS = [
  { id:1,  label:'P-01', size:'5.000 m²',  price:'$14.900.000', view:'Vista Río Ñuble' },
  { id:2,  label:'P-02', size:'5.500 m²',  price:'$15.950.000', view:'Vista Río Ñuble' },
  { id:3,  label:'P-03', size:'6.000 m²',  price:'$16.800.000', view:'Vista cordillera' },
  { id:4,  label:'P-04', size:'7.200 m²',  price:'$19.440.000', view:'Vista cordillera' },
  { id:5,  label:'P-05', size:'8.000 m²',  price:'Consultar',   view:'Vista 360°',      star:true },
  { id:6,  label:'P-06', size:'6.800 m²',  price:'$18.360.000', view:'Lomaje poniente' },
  { id:7,  label:'P-07', size:'5.200 m²',  price:'$15.080.000', view:'Lomaje poniente' },
  { id:8,  label:'P-08', size:'5.800 m²',  price:'$16.530.000', view:'Vista Río Ñuble' },
  { id:9,  label:'P-09', size:'7.500 m²',  price:'Consultar',   view:'Vista Río Ñuble',  star:true },
  { id:10, label:'P-10', size:'9.200 m²',  price:'Consultar',   view:'Vista panorámica', star:true },
  { id:11, label:'P-11', size:'6.100 m²',  price:'$17.385.000', view:'Lomaje sur' },
  { id:12, label:'P-12', size:'5.600 m²',  price:'$15.960.000', view:'Lomaje sur' },
  { id:13, label:'P-13', size:'6.400 m²',  price:'Consultar',   view:'Vista bosque' },
  { id:14, label:'P-14', size:'7.800 m²',  price:'Consultar',   view:'Vista bosque',    star:true },
  { id:15, label:'P-15', size:'10.500 m²', price:'Consultar',   view:'Vista 360°',      star:true },
  { id:16, label:'P-16', size:'8.200 m²',  price:'Consultar',   view:'Lomaje oriente' },
  { id:17, label:'P-17', size:'6.700 m²',  price:'$19.095.000', view:'Lomaje oriente' },
  { id:18, label:'P-18', size:'5.900 m²',  price:'$16.815.000', view:'Vista valle' },
  { id:19, label:'P-19', size:'7.100 m²',  price:'Consultar',   view:'Vista valle' },
  { id:20, label:'P-20', size:'12.000 m²', price:'Consultar',   view:'Parcela premium', star:true },
]

const CAROUSEL_PHOTOS = [
  { src: p('vista-aerea-bosque-lago', 1200), cap:'Vista aérea del proyecto' },
  { src: p('hero-terreno-vista-rio',  1200), cap:'Terreno junto al Río Ñuble' },
  { src: p('rio-nuble-meandros-1',    1200), cap:'Meandros del Río Ñuble' },
  { src: p('camino-interior-montanas',1200), cap:'Vista a la cordillera' },
  { src: p('bosque-con-rio-al-fondo', 1200), cap:'Bosque nativo' },
  { src: p('camino-interior-bosque',  1200), cap:'Vialidad interior' },
  { src: p('bosque-proyecto-extension',1200),cap:'Extensión del proyecto' },
  { src: p('rio-nuble-meandros-2',    1200), cap:'El Río Ñuble' },
]

const MARQUEE_ITEMS = [
  '20 Parcelas Disponibles', '$14.900.000 Desde', '5.000 m² Mínimo',
  '15 min de Chillán', 'Preventa en Verde', 'Río Ñuble', '2027 Entrega',
  'Región del Ñuble', 'Acceso Asfaltado', '100% Garantizado',
]

const VENTAJAS = [
  { ico:'🛡️', t:'Escrituración garantizada',          d:'100% transparente desde el primer pago. Tu inversión protegida.' },
  { ico:'📈', t:'Precio de lanzamiento',                d:'La mejor entrada es ahora, antes que llegue la plusvalía.' },
  { ico:'🛣️', t:'Acceso asfaltado + interior',        d:'Camino asfaltado hasta la entrada, vialidad interior compactada.' },
  { ico:'💧', t:'Agua potable y electricidad',          d:'Servicios básicos disponibles en cada sitio. Listo para construir.' },
  { ico:'🌊', t:'Vista y acceso al Río Ñuble',          d:'El río visible y accesible desde los sitios del proyecto.' },
  { ico:'💳', t:'Financiamiento flexible',              d:'Pie accesible, cuotas a tu medida, sin trámites bancarios.' },
]

// ── ICONS ────────────────────────────────────────────────────
const Arrow   = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
const Check   = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
const Pin     = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
const Phone   = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
const Mail    = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
const ExtLink = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
const Play    = p => <svg {...p} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
const IG      = p => <svg {...p} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>

// ── NAVBAR ───────────────────────────────────────────────────
function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open,  setOpen]  = useState(false)
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 70)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    {l:'Proyecto',  h:'#proyecto'  },
    {l:'Parcelas',  h:'#parcelas'  },
    {l:'Galería',   h:'#galeria'   },
    {l:'Ubicación', h:'#ubicacion' },
  ]

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${solid ? 'bg-[#060c07]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/30' : ''}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${solid ? 'bg-brand-600' : 'glass'}`}>
            <span className="text-white text-[10px] font-bold tracking-widest">PM</span>
          </div>
          <span className="text-white text-[12px] font-semibold tracking-[0.2em] uppercase">Property Maps</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l.h} href={l.h} className="text-white/55 text-[12px] hover:text-white tracking-wide transition-colors">{l.l}</a>
          ))}
        </nav>

        <a href="#contacto"
          className="hidden lg:inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white text-[11px] font-bold px-5 py-2.5 rounded-lg transition-all btn-glow tracking-widest uppercase">
          Cotizar
        </a>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-1">
          <div className="space-y-1.5">
            <span className={`block w-5 h-[1.5px] bg-white transition-all ${open ? 'rotate-45 translate-y-[7px]' : ''}`}/>
            <span className={`block w-5 h-[1.5px] bg-white ${open ? 'opacity-0' : ''}`}/>
            <span className={`block w-5 h-[1.5px] bg-white transition-all ${open ? '-rotate-45 -translate-y-[7px]' : ''}`}/>
          </div>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#060c07]/98 backdrop-blur-xl border-t border-white/[0.06] px-5 pb-5">
          {links.map(l => (
            <a key={l.h} href={l.h} onClick={() => setOpen(false)}
              className="flex items-center justify-between py-3.5 text-sm text-white/60 border-b border-white/[0.05]">
              {l.l}<Arrow className="w-3 h-3 text-white/20"/>
            </a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)}
            className="block text-center mt-5 py-3 bg-brand-600 text-white text-sm font-bold rounded-lg tracking-wide">
            Cotizar Parcela
          </a>
        </div>
      )}
    </header>
  )
}

// ── HERO ─────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-svh flex flex-col justify-end overflow-hidden bg-[#040a04]">

      {/* Background foto + radial glow */}
      <div className="absolute inset-0 overflow-hidden">
        <img src={p('vista-aerea-bosque-lago',1920)} alt="Mirador del Ñuble"
          className="absolute inset-0 w-full h-full object-cover kb"
          loading="eager" fetchPriority="high"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040a04]/95 via-[#040a04]/55 to-[#040a04]/20"/>
        <div className="absolute inset-0 bg-gradient-to-r from-[#040a04]/60 to-transparent"/>
        {/* Radial green glow at center */}
        <div className="absolute inset-0" style={{
          background:'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(34,197,94,0.12) 0%, transparent 70%)'
        }}/>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 w-full pb-24 lg:pb-32 pt-28">

        {/* Logo del proyecto */}
        <img src={LOGO_W} alt="Mirador del Ñuble"
          className="h-14 sm:h-16 lg:h-20 w-auto object-contain object-left mb-8"
          loading="eager"
        />

        {/* Tag pill */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-7">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"/>
          <span className="text-white/70 text-[10px] font-semibold tracking-[0.25em] uppercase">
            Preventa en Verde · Región del Ñuble · Chile
          </span>
        </div>

        {/* Headline gradient */}
        <h1 className="font-extrabold leading-[0.9] tracking-tight mb-8"
          style={{ fontSize:'clamp(3.2rem,10vw,9.5rem)' }}>
          <span className="grad-text block">Mirador</span>
          <span className="grad-text block">del Ñuble</span>
        </h1>

        <p className="text-white/55 text-base lg:text-lg leading-relaxed max-w-lg mb-10 font-light">
          20 parcelas privadas junto al Río Ñuble, a 15 min de Chillán.
          Precio de lanzamiento desde{' '}
          <strong className="text-amber-400 font-semibold">$14.900.000</strong>{' '}
          — proyecto en proceso de obtención de Rol SAG.
        </p>

        <div className="flex flex-wrap gap-3 mb-14">
          <a href="#parcelas"
            className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-500 text-white text-[12px] font-bold px-8 py-4 rounded-xl btn-glow transition-all tracking-widest uppercase">
            Ver Parcelas <Arrow className="w-4 h-4"/>
          </a>
          <a href="#contacto"
            className="inline-flex items-center gap-2.5 glass rounded-xl text-white text-[12px] font-medium px-8 py-4 hover:bg-white/[0.08] transition-all tracking-wide">
            Hablar con un asesor
          </a>
        </div>

        {/* Glassmorphism stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { v:'$14,9M',   l:'Precio desde',        col:'text-amber-400' },
            { v:'5.000 m²', l:'Superficie mínima',   col:'text-brand-400' },
            { v:'20',       l:'Parcelas totales',     col:'text-white' },
            { v:'15 min',   l:'De Chillán',           col:'text-brand-400' },
          ].map((s,i) => (
            <div key={i} className="glass rounded-xl px-4 py-4">
              <div className={`text-2xl sm:text-3xl font-extrabold leading-none mb-1 tabular-nums ${s.col}`}>{s.v}</div>
              <div className="text-white/40 text-[10px] tracking-[0.18em] uppercase font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── MARQUEE ──────────────────────────────────────────────────
function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="bg-brand-600 border-y border-brand-700 overflow-hidden py-3.5">
      <div className="flex whitespace-nowrap marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-6 text-white text-[11px] font-bold tracking-[0.2em] uppercase shrink-0">
            {item}
            <span className="text-brand-300 text-base">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── BENTO — proyecto info en grid moderno ────────────────────
function BentoSection() {
  return (
    <section id="proyecto" className="bg-[#060c07] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-12 reveal">
          <div className="w-px h-10 bg-brand-600"/>
          <div>
            <p className="text-brand-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-1">El Proyecto</p>
            <h2 className="text-white font-extrabold text-3xl lg:text-4xl leading-tight">
              Naturaleza, inversión<br/>
              <span className="grad-text">y plusvalía en un solo lugar</span>
            </h2>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-auto gap-3">

          {/* Card grande — foto principal */}
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl group bento-card reveal-l" style={{minHeight:380}}>
            <img src={p('terreno-camino-rio-nuble',900)} alt="Terreno"
              className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <img src={LOGO_W} alt="Mirador del Ñuble" className="h-8 w-auto mb-3 opacity-90"/>
              <p className="text-white font-bold text-xl leading-tight mb-1">Junto al Río Ñuble</p>
              <p className="text-white/60 text-sm">Región del Ñuble · Chile</p>
            </div>
          </div>

          {/* Card precio */}
          <div className="glass rounded-2xl p-6 flex flex-col justify-between bento-card reveal" style={{minHeight:180}}>
            <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase font-semibold">Precio desde</p>
            <div>
              <div className="text-amber-400 text-3xl font-extrabold leading-none mb-1 tabular-nums">$14,9M</div>
              <div className="text-white/30 text-xs">Precio de lanzamiento · Financiable</div>
            </div>
          </div>

          {/* Card superficie */}
          <div className="glass rounded-2xl p-6 flex flex-col justify-between bento-card reveal" style={{minHeight:180}}>
            <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase font-semibold">Superficie</p>
            <div>
              <div className="text-brand-400 text-3xl font-extrabold leading-none mb-1">5.000 m²</div>
              <div className="text-white/30 text-xs">Hasta 12.000 m² disponible</div>
            </div>
          </div>

          {/* Card descripción */}
          <div className="col-span-2 glass rounded-2xl p-6 bento-card reveal">
            <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase font-semibold mb-3">El proyecto</p>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Mirador del Ñuble está a <strong className="text-brand-400">3 minutos del Puente El Ala</strong>, con acceso asfaltado y vistas privilegiadas al Río Ñuble.
              Proyecto en proceso de obtención de Rol SAG individual — preventa en verde con entrega estimada 2° semestre 2027.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Acceso asfaltado','Vista Río Ñuble','Agua + Luz','Naturaleza nativa','3 min Puente El Ala'].map(t => (
                <span key={t} className="text-[10px] font-semibold text-brand-400 bg-brand-500/10 border border-brand-500/20 px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>

          {/* Card entrega */}
          <div className="glass rounded-2xl p-6 flex flex-col justify-between bento-card reveal-r" style={{minHeight:130}}>
            <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase font-semibold">Entrega estimada</p>
            <div className="text-white text-3xl font-extrabold">2027</div>
          </div>

          {/* Card parcelas */}
          <div className="bg-brand-600 rounded-2xl p-6 flex flex-col justify-between bento-card reveal-r" style={{minHeight:130}}>
            <p className="text-brand-200/70 text-[10px] tracking-[0.25em] uppercase font-semibold">Disponibles</p>
            <div>
              <div className="text-white text-3xl font-extrabold mb-0.5">20</div>
              <div className="text-brand-200/70 text-xs">Todas las parcelas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── HORIZONTAL CAROUSEL ──────────────────────────────────────
function GaleriaCarousel() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const dragRef = useRef({ dragging: false, startX: 0, scrollLeft: 0 })

  const onDown = e => {
    const tr = trackRef.current; if (!tr) return
    dragRef.current = { dragging: true, startX: e.pageX - tr.offsetLeft, scrollLeft: tr.scrollLeft }
    tr.style.cursor = 'grabbing'
  }
  const onUp = () => {
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
    dragRef.current.dragging = false
  }
  const onMove = e => {
    if (!dragRef.current.dragging) return
    e.preventDefault()
    const tr = trackRef.current; if (!tr) return
    tr.scrollLeft = dragRef.current.scrollLeft - (e.pageX - tr.offsetLeft - dragRef.current.startX) * 1.4
  }
  const onScroll = () => {
    const tr = trackRef.current; if (!tr) return
    const idx = Math.round(tr.scrollLeft / (tr.clientWidth * 0.78))
    setActive(Math.max(0, Math.min(idx, CAROUSEL_PHOTOS.length - 1)))
  }
  const scrollTo = i => {
    const tr = trackRef.current; if (!tr) return
    tr.scrollTo({ left: i * tr.clientWidth * 0.78, behavior:'smooth' })
  }

  return (
    <section id="galeria" className="bg-[#040a04] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 mb-10">
        <div className="flex items-end justify-between reveal">
          <div>
            <div className="w-px h-10 bg-brand-600 mb-4"/>
            <h2 className="text-white font-extrabold text-3xl lg:text-4xl leading-tight">
              El entorno que<br/><span className="grad-text">te espera</span>
            </h2>
          </div>
          <p className="text-white/35 text-sm max-w-[220px] text-right hidden sm:block">
            Arrastra para explorar · {CAROUSEL_PHOTOS.length} fotografías del terreno
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-3 overflow-x-scroll carousel-track pl-5 lg:pl-10 pr-5 lg:pr-10"
          onMouseDown={onDown} onMouseUp={onUp} onMouseLeave={onUp} onMouseMove={onMove}
          onScroll={onScroll}
          style={{ paddingRight:'calc(22vw + 1.25rem)' }}
        >
          {CAROUSEL_PHOTOS.map((ph, i) => (
            <div key={i} className={`carousel-item shrink-0 relative overflow-hidden rounded-2xl transition-all duration-300 ${i === active ? 'opacity-100' : 'opacity-60'}`}
              style={{ width:'78vw', maxWidth:700, aspectRatio:'4/3' }}>
              <img src={ph.src} alt={ph.cap}
                className="w-full h-full object-cover"
                loading="lazy"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
              <div className="absolute bottom-4 left-5 text-white/80 text-xs font-medium">{ph.cap}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {CAROUSEL_PHOTOS.map((_,i) => (
          <button key={i} onClick={() => scrollTo(i)}
            className={`rounded-full transition-all duration-300 ${i === active ? 'w-5 h-2 bg-brand-500' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  )
}

// ── VIDEO SHOWCASE ───────────────────────────────────────────
function VideoShowcase() {
  const [playing, setPlaying] = useState(false)
  return (
    <section className="bg-[#060c07] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4 reveal">
          <h2 className="text-white font-extrabold text-3xl lg:text-4xl">
            Recorre el terreno<br/><span className="grad-text">desde el aire</span>
          </h2>
          <p className="text-white/35 text-sm max-w-xs">Video dron 4K · 32 segundos · Vista real del proyecto</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl aspect-video bg-[#0a1a0a] reveal">
          {!playing ? (
            <>
              <img src={p('hero-terreno-vista-rio',1280)} alt="Video preview"
                className="w-full h-full object-cover opacity-70"/>
              <div className="absolute inset-0 flex items-center justify-center">
                <button onClick={() => setPlaying(true)}
                  className="group glass rounded-2xl flex items-center gap-4 px-7 py-5 hover:bg-white/[0.08] transition-all">
                  <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center shrink-0 btn-glow">
                    <Play className="w-5 h-5 text-white ml-0.5"/>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold text-sm">Ver video del proyecto</div>
                    <div className="text-white/40 text-xs">Mirador del Ñuble · Dron 4K · 0:32</div>
                  </div>
                </button>
              </div>
              <div className="absolute bottom-4 right-4 glass rounded-lg px-3 py-1.5">
                <span className="text-white/50 text-[10px] tracking-widest uppercase">Mirador del Ñuble · Chile</span>
              </div>
            </>
          ) : (
            <video autoPlay controls className="w-full h-full object-cover" poster={p('hero-terreno-vista-rio',1280)}>
              <source src={VIDEO} type="video/mp4"/>
            </video>
          )}
        </div>
      </div>
    </section>
  )
}

// ── PARCELAS ─────────────────────────────────────────────────
function Parcelas() {
  const [sel, setSel] = useState(null)
  return (
    <section id="parcelas" className="bg-[#040a04] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-5 reveal">
          <div>
            <div className="w-px h-10 bg-brand-600 mb-4"/>
            <h2 className="text-white font-extrabold text-3xl lg:text-4xl leading-tight">
              Elige tu parcela<br/><span className="grad-text">todas disponibles</span>
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 px-4 py-2.5 rounded-xl self-start">
            <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse"/>
            <span className="text-brand-400 text-[11px] font-bold tracking-[0.15em] uppercase">20 / 20 disponibles</span>
          </div>
        </div>

        {/* Grid de lotes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 mb-3">
          {LOTS.map(lot => {
            const isSel = sel?.id === lot.id
            return (
              <button key={lot.id} onClick={() => setSel(isSel ? null : lot)}
                className={`relative p-4 text-left rounded-xl border transition-all duration-200 ${
                  isSel
                    ? 'bg-brand-600 border-brand-500 shadow-lg shadow-brand-900/50'
                    : 'glass hover:border-brand-500/40 hover:bg-brand-500/5'
                }`}>
                {lot.star && <span className="absolute top-2 right-2 text-amber-400 text-[11px]">★</span>}
                <div className={`font-bold text-sm mb-1 ${isSel ? 'text-white' : 'text-white'}`}>{lot.label}</div>
                <div className={`text-xs mb-2 ${isSel ? 'text-white/70' : 'text-white/40'}`}>{lot.size}</div>
                <div className={`text-[10px] font-bold ${isSel ? 'text-brand-200' : 'text-brand-500'}`}>Disponible</div>
              </button>
            )
          })}
        </div>

        {/* Panel seleccionado */}
        {sel && (
          <div className="glass rounded-2xl p-6 lg:p-8 border-brand-500/20 mt-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[
                { k:'Parcela',    v:sel.label, gold:false },
                { k:'Superficie', v:sel.size,  gold:false },
                { k:'Precio',     v:sel.price, gold:true },
                { k:'Vista',      v:sel.view,  gold:false },
              ].map(({k,v,gold}) => (
                <div key={k}>
                  <div className="text-white/25 text-[9px] tracking-[0.25em] uppercase mb-1.5">{k}</div>
                  <div className={`font-extrabold text-xl ${gold ? 'text-amber-400' : 'text-white'}`}>{v}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-white/[0.06]">
              <p className="text-white/40 text-sm">
                Proyecto en preventa · <span className="text-white font-semibold">{sel.label}</span> · {sel.view}
              </p>
              <a href="#contacto"
                className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-500 text-white text-[11px] font-bold px-7 py-3.5 rounded-xl btn-glow transition-all tracking-widest uppercase shrink-0">
                Cotizar {sel.label} <Arrow className="w-3.5 h-3.5"/>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ── VENTAJAS — glassmorphism cards ───────────────────────────
function Ventajas() {
  return (
    <section className="bg-[#060c07] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6 reveal">
          <div>
            <div className="w-px h-10 bg-brand-600 mb-4"/>
            <h2 className="text-white font-extrabold text-3xl lg:text-4xl leading-tight">
              Todo incluido.<br/><span className="grad-text">Nada oculto.</span>
            </h2>
          </div>
          <p className="text-white/35 text-sm max-w-xs">
            Cada parcela viene con lo esencial para planificar, construir y disfrutar desde el primer día.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VENTAJAS.map((v, i) => (
            <div key={i} className="glass rounded-2xl p-6 lg:p-7 group hover:border-brand-500/30 hover:bg-brand-500/5 transition-all bento-card reveal">
              <div className="text-3xl mb-4">{v.ico}</div>
              <div className="text-white font-bold text-[15px] mb-2">{v.t}</div>
              <div className="text-white/40 text-sm leading-relaxed">{v.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── MAPA ─────────────────────────────────────────────────────
function Mapa() {
  const LAT = '-36.578819', LNG = '-72.256633'
  const src = `https://maps.google.com/maps?q=${LAT},${LNG}&t=k&z=15&ie=UTF8&iwloc=&output=embed`
  const tags = [
    { l:'3 min',  s:'Puente El Ala'  },
    { l:'15 min', s:'Chillán'        },
    { l:'1:20 h', s:'Concepción'     },
    { l:'Vista',  s:'Río Ñuble'      },
    { l:'100%',   s:'Asfaltado'      },
    { l:'75 km',  s:'Termas Chillán' },
  ]

  return (
    <section id="ubicacion" className="bg-[#040a04] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        <div className="flex items-center gap-4 mb-12 reveal">
          <div className="w-px h-10 bg-brand-600"/>
          <div>
            <p className="text-brand-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-1">Ubicación</p>
            <h2 className="text-white font-extrabold text-3xl lg:text-4xl">
              Cerca de todo,<br/><span className="grad-text">lejos del ruido</span>
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.7fr] gap-8 lg:gap-12 items-start">

          {/* Info */}
          <div className="reveal-l">
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Acceso completamente asfaltado hasta la entrada del proyecto.
            </p>

            {/* Tags en grid */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              {tags.map((t,i) => (
                <div key={i} className="glass rounded-xl px-4 py-3">
                  <div className="text-brand-400 font-extrabold text-xl leading-none mb-0.5 tabular-nums">{t.l}</div>
                  <div className="text-white/35 text-[11px]">{t.s}</div>
                </div>
              ))}
            </div>

            <div className="glass rounded-xl px-4 py-3 font-mono text-white/30 text-xs mb-5">
              📌 {LAT}° S · {LNG}° W
            </div>

            <a href={`https://maps.google.com/?q=${LAT},${LNG}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-500 text-white text-[11px] font-bold px-6 py-3.5 rounded-xl btn-glow transition-all tracking-widest uppercase">
              <Pin className="w-4 h-4"/>
              Abrir en Google Maps
              <ExtLink className="w-3 h-3 opacity-70"/>
            </a>
          </div>

          {/* Mapa */}
          <div className="relative reveal-r">
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/60 border border-white/[0.06]">
              <iframe src={src} width="100%" height="560" style={{border:0,display:'block'}}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Mirador del Ñuble"/>
            </div>
            {/* Pin flotante */}
            <div className="absolute -bottom-4 left-5 glass rounded-xl flex items-center gap-3 px-4 py-3 shadow-xl">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shrink-0">
                <Pin className="w-4 h-4 text-white"/>
              </div>
              <div>
                <div className="text-white font-bold text-sm">Mirador del Ñuble</div>
                <div className="text-white/40 text-[11px]">Vista satélite · 15 min Chillán</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── CONTACTO ─────────────────────────────────────────────────
function Contacto() {
  const [form, setForm] = useState({ name:'',email:'',phone:'',interest:'',msg:'' })
  const [sent, setSent] = useState(false)
  const set = k => e => setForm(f => ({...f,[k]:e.target.value}))
  const inp = 'w-full glass rounded-xl text-white placeholder-white/25 text-sm px-4 py-3.5 focus:outline-none focus:border-brand-500/60 focus:bg-brand-500/5 transition-all border border-white/[0.06]'

  return (
    <section id="contacto" className="bg-[#060c07] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          <div className="reveal-l">
            <div className="w-px h-10 bg-brand-600 mb-6"/>
            <img src={LOGO_W} alt="Mirador del Ñuble" className="h-12 w-auto object-contain object-left mb-7 opacity-80"/>
            <h2 className="text-white font-extrabold text-3xl lg:text-4xl leading-tight mb-6">
              ¿Listo para<br/><span className="grad-text">dar el primer paso?</span>
            </h2>
            <p className="text-white/45 text-sm leading-relaxed mb-12">
              Un asesor te contactará pronto con disponibilidad, precios actualizados y toda
              la información del proceso de compra en verde.
            </p>
            <div className="space-y-5">
              {[
                { I:Phone, l:'Teléfono', v:'+56 9 4567 8901',       h:'tel:+56945678901' },
                { I:Mail,  l:'Email',    v:'ventas@propertymaps.cl', h:'mailto:ventas@propertymaps.cl' },
                { I:Pin,   l:'Proyecto', v:'15 min de Chillán',      h:null },
              ].map(({I,l,v,h}) => (
                <div key={l} className="flex items-center gap-4">
                  <div className="w-9 h-9 glass rounded-xl flex items-center justify-center shrink-0">
                    <I className="w-4 h-4 text-brand-400"/>
                  </div>
                  <div>
                    <div className="text-white/25 text-[9px] tracking-[0.25em] uppercase mb-0.5">{l}</div>
                    {h ? <a href={h} className="text-white text-sm hover:text-brand-400 transition-colors">{v}</a>
                       : <span className="text-white text-sm">{v}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-r">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 gap-5">
                <div className="w-16 h-16 bg-brand-600/20 border border-brand-500/30 rounded-2xl flex items-center justify-center">
                  <Check className="w-8 h-8 text-brand-400"/>
                </div>
                <h3 className="text-white font-bold text-2xl">¡Solicitud enviada!</h3>
                <p className="text-white/40 max-w-xs text-sm leading-relaxed">
                  Te contactaremos dentro de las próximas 24 horas con información completa sobre Mirador del Ñuble.
                </p>
                <button onClick={() => setSent(false)} className="text-brand-500 text-sm hover:text-brand-400 mt-1">
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={e => {e.preventDefault();setSent(true)}} className="space-y-4" noValidate>
                <p className="text-white font-bold text-xl mb-6">Solicitar información</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text"  placeholder="Nombre completo" required value={form.name}  onChange={set('name')}  className={inp}/>
                  <input type="tel"   placeholder="+56 9 XXXX XXXX"          value={form.phone} onChange={set('phone')} className={inp}/>
                </div>
                <input type="email" placeholder="Correo electrónico" required value={form.email} onChange={set('email')} className={inp}/>
                <select value={form.interest} onChange={set('interest')}
                  className={`${inp} appearance-none cursor-pointer`} style={{background:'rgba(255,255,255,0.04)'}}>
                  <option value=""       style={{background:'#060c07'}}>Parcela de interés…</option>
                  <option value="rio"    style={{background:'#060c07'}}>Parcela Río — desde $14.900.000</option>
                  <option value="bosque" style={{background:'#060c07'}}>Parcela Bosque — consultar precio</option>
                  <option value="grande" style={{background:'#060c07'}}>Parcela Grande — consultar precio</option>
                  <option value="asesoria" style={{background:'#060c07'}}>Quiero asesoría general</option>
                </select>
                <textarea placeholder="Mensaje (opcional)" rows={3} value={form.msg} onChange={set('msg')}
                  className={`${inp} resize-none`}/>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <span className="text-white/20 text-xs">Sin spam · Datos confidenciales</span>
                  <button type="submit"
                    className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-500 text-white text-[11px] font-bold px-8 py-4 rounded-xl btn-glow transition-all tracking-widest uppercase shrink-0">
                    Enviar solicitud <Arrow className="w-3.5 h-3.5"/>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── FOOTER ───────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#020602] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 bg-brand-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-[10px] font-bold tracking-widest">PM</span>
              </div>
              <span className="text-white text-[12px] font-semibold tracking-[0.2em] uppercase">Property Maps</span>
            </div>
            <p className="text-white/20 text-xs leading-relaxed mb-5 max-w-[200px]">
              Corretaje y gestión de subdivisiones agrícolas premium en el sur de Chile.
            </p>
            <img src={LOGO_W} alt="Mirador del Ñuble" className="h-7 w-auto object-contain object-left opacity-20 mb-5"/>
            <a href="#" className="w-8 h-8 glass rounded-lg inline-flex items-center justify-center text-white/30 hover:text-white transition-colors">
              <IG className="w-3.5 h-3.5"/>
            </a>
          </div>
          {[
            { t:'Navegación', ls:['El Proyecto','Parcelas','Galería','Ubicación','Contacto'] },
            { t:'Empresa',    ls:['Sobre PM','Proyectos','Prensa'] },
            { t:'Legal',      ls:['Privacidad','Términos','SAG'] },
          ].map(col => (
            <div key={col.t}>
              <h5 className="text-white/25 text-[9px] font-bold tracking-[0.3em] uppercase mb-5">{col.t}</h5>
              <ul className="space-y-3">
                {col.ls.map(l => <li key={l}><a href="#" className="text-white/25 text-xs hover:text-white/60 transition-colors">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/15 text-xs">© {year} Property Maps SpA. Todos los derechos reservados.</p>
          <p className="text-white/10 text-xs">Precios referenciales · Proyecto en preventa</p>
        </div>
      </div>
    </footer>
  )
}

// ── APP ──────────────────────────────────────────────────────
export default function App() {
  useReveal()
  return (
    <div className="font-sans bg-[#040a04]">
      <Navbar/>
      <main>
        <Hero/>
        <Marquee/>
        <BentoSection/>
        <GaleriaCarousel/>
        <VideoShowcase/>
        <Parcelas/>
        <Ventajas/>
        <Mapa/>
        <Contacto/>
      </main>
      <Footer/>
    </div>
  )
}
