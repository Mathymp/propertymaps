import { useState, useEffect } from 'react'

// ─────────────────────────────────────────────────────────────
// CLOUDINARY
// ─────────────────────────────────────────────────────────────

const CLOUD  = 'dysqraxnh'
const FOLDER = 'mirador-nuble'

const photo = (name, w = 1920) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto:best,w_${w},e_vibrance:90,e_saturation:60,e_contrast:35,e_sharpen:120,e_brightness:8/${FOLDER}/${name}`

const LOGO_W = `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto:best,w_420/${FOLDER}/logo-mirador-blanco.png`
const LOGO_G = `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto:best,w_420/${FOLDER}/logo-mirador-verde.png`
const VIDEO  = `https://res.cloudinary.com/${CLOUD}/video/upload/vc_h264,q_auto,w_1280/${FOLDER}/video-hero.mp4`

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

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

const VENTAJAS = [
  { n:'01', title:'Escrituración garantizada', desc:'Proceso 100% transparente desde el primer pago. Tu inversión protegida en todo momento.' },
  { n:'02', title:'Precio de lanzamiento',     desc:'El mejor precio es hoy. Comprar en verde es comprar antes de que llegue la plusvalía.' },
  { n:'03', title:'Acceso asfaltado',          desc:'Camino asfaltado hasta la entrada. Vialidad interior compactada. Cómodo todo el año.' },
  { n:'04', title:'Servicios incluidos',       desc:'Agua potable rural y electricidad disponibles en cada sitio. Listo para construir.' },
  { n:'05', title:'Vista al Río Ñuble',        desc:'Paisaje natural único como fondo de tu vida. El río visible desde los sitios del proyecto.' },
  { n:'06', title:'Financiamiento flexible',   desc:'Pie accesible, cuotas a tu medida. Sin trámites bancarios complicados.' },
]

const GALLERY_IMGS = [
  { src: photo('vista-aerea-bosque-lago', 1400), alt:'Vista aérea del proyecto', wide: true  },
  { src: photo('rio-nuble-meandros-1',    800),  alt:'Meandros del Río Ñuble',   wide: false },
  { src: photo('bosque-con-rio-al-fondo', 800),  alt:'Bosque nativo',            wide: false },
  { src: photo('camino-interior-montanas',1000), alt:'Vistas a la cordillera',   wide: true  },
  { src: photo('hero-terreno-vista-rio',  800),  alt:'Vista al río desde terreno',wide: false },
  { src: photo('camino-interior-bosque',  800),  alt:'Camino interior',          wide: false },
]

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const Arrow   = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
const Check   = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
const Pin     = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
const Phone   = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
const Mail    = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
const ExtLink = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
const ChevD   = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
const Play    = p => <svg {...p} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
const IG      = p => <svg {...p} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>

// ─────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────

function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open,  setOpen]  = useState(false)

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label:'Proyecto',  href:'#proyecto'  },
    { label:'Parcelas',  href:'#parcelas'  },
    { label:'Galería',   href:'#galeria'   },
    { label:'Ubicación', href:'#ubicacion' },
  ]

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'bg-white/96 backdrop-blur-lg border-b border-zinc-100 shadow-sm' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-18">

        {/* Property Maps wordmark */}
        <a href="#" className="flex items-center gap-2.5">
          <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${solid ? 'bg-brand-700' : 'bg-white/20 border border-white/30'}`}>
            <span className="text-white text-[9px] font-bold tracking-wider">PM</span>
          </div>
          <span className={`text-[11px] font-semibold tracking-[0.25em] uppercase transition-colors ${solid ? 'text-zinc-800' : 'text-white/90'}`}>
            Property Maps
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className={`text-[12px] tracking-wide transition-colors hover:opacity-60 ${solid ? 'text-zinc-600' : 'text-white/75'}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contacto"
          className={`hidden lg:inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase px-5 py-2.5 rounded-sm transition-all ${solid ? 'bg-brand-700 text-white hover:bg-brand-800' : 'border border-white/40 text-white hover:bg-white/10'}`}>
          Cotizar parcela
        </a>

        <button onClick={() => setOpen(!open)} className={`lg:hidden p-1 ${solid ? 'text-zinc-700' : 'text-white'}`}>
          <div className="space-y-[5px]">
            <span className={`block w-5 h-[1.5px] bg-current transition-all ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-current transition-all ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-zinc-100 px-6 pb-6">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center justify-between py-3.5 text-sm text-zinc-600 border-b border-zinc-50 last:border-0">
              {l.label}<Arrow className="w-3 h-3 text-zinc-300" />
            </a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)}
            className="block text-center mt-5 py-3 bg-brand-700 text-white text-sm font-semibold rounded-sm tracking-wide">
            Cotizar parcela
          </a>
        </div>
      )}
    </header>
  )
}

// ─────────────────────────────────────────────────────────────
// HERO — fotografía limpia, logo grande, texto mínimo
// ─────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-svh flex flex-col justify-end overflow-hidden">
      {/* Foto del terreno — Ken Burns suave */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={photo('vista-aerea-bosque-lago', 1920)}
          alt="Mirador del Ñuble — vista aérea"
          className="w-full h-full object-cover object-center animate-kenburns"
          loading="eager" fetchPriority="high"
        />
        {/* Overlay suave — no tan oscuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-24 lg:pb-32 pt-32">

        {/* Logo del proyecto */}
        <img src={LOGO_W} alt="Mirador del Ñuble"
          className="h-14 sm:h-18 lg:h-20 w-auto object-contain object-left mb-10"
          loading="eager"
        />

        {/* Tag */}
        <p className="text-white/50 text-[11px] tracking-[0.3em] uppercase mb-5">
          Parcelas agrícolas · Región del Ñuble · Chile
        </p>

        {/* Título serif grande */}
        <h1 className="font-serif font-light text-white leading-[1] tracking-tight mb-7"
          style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}>
          Tu terreno<br />
          <em className="not-italic font-normal" style={{ color:'#d4b06a' }}>junto al río</em>
        </h1>

        <p className="text-white/55 text-base lg:text-lg leading-relaxed max-w-md mb-10 font-light">
          20 parcelas privadas a 15 minutos de Chillán, con vistas directas al Río Ñuble.
          Preventa en verde — <span className="text-white/80">precio de lanzamiento desde $14.900.000.</span>
        </p>

        <div className="flex flex-wrap gap-3">
          <a href="#parcelas"
            className="inline-flex items-center gap-2.5 bg-white text-zinc-900 text-[12px] font-semibold px-7 py-4 rounded-sm hover:bg-zinc-100 transition-colors tracking-widest uppercase">
            Ver Parcelas
            <Arrow className="w-4 h-4" />
          </a>
          <a href="#contacto"
            className="inline-flex items-center gap-2.5 border border-white/30 text-white text-[12px] font-medium px-7 py-4 rounded-sm hover:bg-white/8 transition-colors tracking-wide">
            Hablar con un asesor
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-30 pointer-events-none">
        <ChevD className="w-5 h-5 text-white animate-bounce" />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// STATS BAR — 5 números clave, fondo blanco limpio
// ─────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { val:'$14,9M',    label:'Precio desde' },
    { val:'5.000 m²',  label:'Superficie mínima' },
    { val:'20',        label:'Parcelas totales' },
    { val:'15 min',    label:'De Chillán' },
    { val:'2027',      label:'Entrega estimada' },
  ]

  return (
    <section className="bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-zinc-100">
          {stats.map((s, i) => (
            <div key={i} className="py-8 px-5 first:pl-0 last:pr-0 text-center sm:text-left">
              <div className="font-serif text-3xl lg:text-4xl text-zinc-900 font-light leading-none mb-1.5"
                style={{ color: i === 0 ? '#b8934a' : undefined }}>
                {s.val}
              </div>
              <div className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// PROYECTO — editorial split, serif heading, logo visible
// ─────────────────────────────────────────────────────────────

function Proyecto() {
  const features = [
    'Acceso directo y vistas al Río Ñuble',
    'A 3 minutos del Puente El Ala',
    'Agua potable rural y electricidad en cada sitio',
    'Vegetación nativa: robles, avellanos, boldos',
    'Escrituración garantizada al obtener Rol SAG',
    'Financiamiento directo disponible',
  ]

  return (
    <section id="proyecto" className="bg-white py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="block h-px w-12 bg-zinc-200" />
          <span className="text-[10px] text-zinc-400 tracking-[0.3em] uppercase font-medium">El Proyecto</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Texto */}
          <div>
            {/* Logo del proyecto aquí */}
            <img src={LOGO_G} alt="Mirador del Ñuble"
              className="h-10 w-auto object-contain object-left mb-8 opacity-70"
            />

            <h2 className="font-serif font-light text-zinc-900 leading-[1.1] mb-8"
              style={{ fontSize:'clamp(2.2rem, 5vw, 4rem)' }}>
              Vive donde el río<br />
              <em className="not-italic font-normal" style={{ color:'#b8934a' }}>
                y la montaña se encuentran
              </em>
            </h2>

            <p className="text-zinc-500 leading-relaxed mb-4 text-[15px]">
              Mirador del Ñuble está ubicado a <strong className="text-zinc-700 font-semibold">3 minutos del Puente El Ala</strong>,
              con acceso directo y vistas al Río Ñuble. Proyecto en proceso de obtención de Rol SAG individual —
              la oportunidad de comprar al precio más bajo antes de la plusvalía.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-10">
              Proyecto en verde con entrega estimada para el 2° semestre de 2027.
            </p>

            <ul className="space-y-3 mb-10">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                  <span className="text-zinc-500 text-sm">{f}</span>
                </li>
              ))}
            </ul>

            <a href="#parcelas"
              className="inline-flex items-center gap-2.5 border border-zinc-800 text-zinc-800 text-[11px] font-semibold px-7 py-3.5 rounded-sm hover:bg-zinc-800 hover:text-white transition-all tracking-widest uppercase">
              Ver parcelas disponibles
              <Arrow className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Foto */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img src={photo('terreno-camino-rio-nuble', 900)}
                alt="Terreno junto al Río Ñuble"
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-1000"
                loading="lazy"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white shadow-xl border border-zinc-100 px-5 py-4 rounded-sm">
              <div className="font-serif text-2xl font-light text-zinc-900 leading-none mb-1" style={{ color:'#b8934a' }}>
                3 min
              </div>
              <div className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase">Del Puente El Ala</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// VIDEO SHOWCASE — sección dedicada al video dron
// ─────────────────────────────────────────────────────────────

function VideoShowcase() {
  const [play, setPlay] = useState(false)

  return (
    <section className="bg-zinc-50 py-24 lg:py-32 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-5">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="block h-px w-12 bg-zinc-200" />
              <span className="text-[10px] text-zinc-400 tracking-[0.3em] uppercase font-medium">Conoce el terreno</span>
            </div>
            <h2 className="font-serif font-light text-zinc-900 leading-tight"
              style={{ fontSize:'clamp(2rem, 4vw, 3.5rem)' }}>
              Recorre el proyecto<br />
              <em className="not-italic" style={{ color:'#b8934a' }}>desde el aire</em>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
            Grabado en 4K con dron profesional. Visita virtual del terreno, el río y el entorno natural.
          </p>
        </div>

        {/* Video player elegante */}
        <div className="relative overflow-hidden rounded-sm bg-zinc-900 shadow-2xl" style={{ aspectRatio:'16/9' }}>
          {!play ? (
            <>
              <img src={photo('hero-terreno-vista-rio', 1280)}
                alt="Vista del proyecto"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button onClick={() => setPlay(true)}
                  className="group flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/25 text-white pl-6 pr-8 py-5 rounded-sm hover:bg-white/20 transition-all">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                    <Play className="w-5 h-5 text-zinc-900 ml-0.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold tracking-wide">Ver video del proyecto</div>
                    <div className="text-white/50 text-xs">00:32 · Video dron 4K</div>
                  </div>
                </button>
              </div>
              {/* Overlay tag */}
              <div className="absolute bottom-5 left-5 bg-black/40 backdrop-blur-sm text-white/70 text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-sm">
                Mirador del Ñuble · Región del Ñuble, Chile
              </div>
            </>
          ) : (
            <video
              autoPlay controls className="w-full h-full object-cover"
              poster={photo('hero-terreno-vista-rio', 1280)}
            >
              <source src={VIDEO} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// PARCELAS — grid limpio, todas disponibles
// ─────────────────────────────────────────────────────────────

function Parcelas() {
  const [sel, setSel] = useState(null)
  const [page, setPage] = useState(0)
  const PER = 10
  const shown = LOTS.slice(page * PER, page * PER + PER)
  const pages = Math.ceil(LOTS.length / PER)

  return (
    <section id="parcelas" className="bg-white py-24 lg:py-36 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="block h-px w-12 bg-zinc-200" />
              <span className="text-[10px] text-zinc-400 tracking-[0.3em] uppercase font-medium">Disponibilidad</span>
            </div>
            <h2 className="font-serif font-light text-zinc-900 leading-tight"
              style={{ fontSize:'clamp(2.2rem, 5vw, 4rem)' }}>
              Elige tu parcela ideal
            </h2>
            <p className="text-zinc-400 text-sm mt-3 leading-relaxed max-w-md">
              Preventa en verde · 20 parcelas disponibles · Precio de lanzamiento
            </p>
          </div>
          <div className="flex items-center gap-2 bg-brand-50 border border-brand-100 px-4 py-3 rounded-sm self-start">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-pulse shrink-0" />
            <span className="text-brand-700 text-[11px] font-semibold tracking-[0.15em] uppercase">
              20 parcelas disponibles
            </span>
          </div>
        </div>

        {/* Grid de parcelas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
          {shown.map(lot => {
            const isSel = sel?.id === lot.id
            return (
              <button key={lot.id} onClick={() => setSel(isSel ? null : lot)}
                className={`relative p-4 text-left border rounded-sm transition-all ${
                  isSel
                    ? 'bg-zinc-900 border-zinc-900 shadow-md'
                    : 'bg-white border-zinc-100 hover:border-zinc-300 hover:shadow-sm'
                }`}>
                {lot.star && (
                  <span className="absolute top-2 right-2 text-[#b8934a] text-[11px]">★</span>
                )}
                <div className={`font-semibold text-sm mb-1 ${isSel ? 'text-white' : 'text-zinc-800'}`}>
                  {lot.label}
                </div>
                <div className={`text-xs mb-3 ${isSel ? 'text-white/50' : 'text-zinc-400'}`}>{lot.size}</div>
                <div className={`text-[10px] font-semibold tracking-wide ${isSel ? 'text-brand-400' : 'text-brand-700'}`}>
                  Disponible
                </div>
              </button>
            )
          })}
        </div>

        {/* Paginación */}
        {pages > 1 && (
          <div className="flex gap-2 mb-6">
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} onClick={() => { setPage(i); setSel(null) }}
                className={`w-8 h-8 text-xs font-semibold rounded-sm transition-all ${page === i ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Panel de detalle */}
        {sel && (
          <div className="border border-zinc-100 bg-zinc-50 rounded-sm p-6 lg:p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[
                { k:'Parcela',    v:sel.label, accent:false },
                { k:'Superficie', v:sel.size,  accent:false },
                { k:'Precio',     v:sel.price, accent:true  },
                { k:'Vista',      v:sel.view,  accent:false },
              ].map(({ k, v, accent }) => (
                <div key={k}>
                  <div className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase mb-1.5">{k}</div>
                  <div className={`font-serif text-2xl font-light ${accent ? '' : 'text-zinc-800'}`}
                    style={accent ? { color:'#b8934a' } : {}}>
                    {v}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-zinc-200">
              <p className="text-zinc-400 text-sm">
                Proyecto en preventa · Parcela <strong className="text-zinc-700">{sel.label}</strong> disponible
              </p>
              <a href="#contacto"
                className="inline-flex items-center gap-2.5 bg-zinc-900 text-white text-[11px] font-semibold px-7 py-3.5 rounded-sm hover:bg-zinc-700 transition-colors tracking-widest uppercase shrink-0">
                Cotizar {sel.label}
                <Arrow className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// GALERÍA — editorial stagger, fondo crema
// ─────────────────────────────────────────────────────────────

function Galeria() {
  return (
    <section id="galeria" className="bg-zinc-50 py-24 lg:py-36 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-5">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="block h-px w-12 bg-zinc-200" />
              <span className="text-[10px] text-zinc-400 tracking-[0.3em] uppercase font-medium">Galería</span>
            </div>
            <h2 className="font-serif font-light text-zinc-900 leading-tight"
              style={{ fontSize:'clamp(2.2rem, 5vw, 4rem)' }}>
              El entorno que<br />
              <em className="not-italic" style={{ color:'#b8934a' }}>te espera</em>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
            Lomajes suaves, bosque nativo, el Río Ñuble y la cordillera como horizonte permanente.
          </p>
        </div>

        {/* Grid editorial asimétrico */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {GALLERY_IMGS.map((g, i) => (
            <div key={i}
              className={`overflow-hidden rounded-sm group ${
                g.wide
                  ? 'sm:col-span-2 aspect-[16/9]'
                  : 'aspect-[4/3]'
              }`}>
              <img src={g.src} alt={g.alt}
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 brightness-95 group-hover:brightness-100"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// VENTAJAS — lista editorial con números, no cards
// ─────────────────────────────────────────────────────────────

function Ventajas() {
  return (
    <section className="bg-white py-24 lg:py-36 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">

          <div className="lg:sticky lg:top-24 self-start">
            <div className="flex items-center gap-4 mb-5">
              <span className="block h-px w-12 bg-zinc-200" />
              <span className="text-[10px] text-zinc-400 tracking-[0.3em] uppercase font-medium">Lo que incluye</span>
            </div>
            <h2 className="font-serif font-light text-zinc-900 leading-tight mb-6"
              style={{ fontSize:'clamp(2rem, 4vw, 3.5rem)' }}>
              Todo incluido.<br />
              <em className="not-italic" style={{ color:'#b8934a' }}>Nada oculto.</em>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Cada parcela viene con lo esencial para que puedas planificar, construir y disfrutar
              sin sorpresas.
            </p>
          </div>

          <div className="divide-y divide-zinc-100">
            {VENTAJAS.map((v, i) => (
              <div key={i} className="py-7 flex gap-6 group hover:pl-2 transition-all duration-300">
                <span className="font-serif text-zinc-200 text-4xl font-light leading-none shrink-0 group-hover:text-zinc-300 transition-colors">
                  {v.n}
                </span>
                <div>
                  <div className="font-semibold text-zinc-800 text-[15px] mb-1.5">{v.title}</div>
                  <div className="text-zinc-400 text-sm leading-relaxed">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// UBICACIÓN — mapa grande + info lateral elegante
// ─────────────────────────────────────────────────────────────

function Ubicacion() {
  const LAT = '-36.578819', LNG = '-72.256633'
  const mapSrc = `https://maps.google.com/maps?q=${LAT},${LNG}&t=k&z=15&ie=UTF8&iwloc=&output=embed`
  const mapsUrl = `https://maps.google.com/?q=${LAT},${LNG}`

  const tags = [
    { icon:'🚗', label:'3 min',   sub:'Puente El Ala' },
    { icon:'🏙️', label:'15 min', sub:'Chillán' },
    { icon:'🚗', label:'1h 20',  sub:'Concepción' },
    { icon:'🌊', label:'Vista',   sub:'Río Ñuble' },
    { icon:'🛣️', label:'100%',   sub:'Asfaltado' },
    { icon:'🏔️', label:'75 km',  sub:'Termas Chillán' },
  ]

  return (
    <section id="ubicacion" className="bg-zinc-50 py-24 lg:py-36 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="block h-px w-12 bg-zinc-200" />
          <span className="text-[10px] text-zinc-400 tracking-[0.3em] uppercase font-medium">Ubicación</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.8fr] gap-12 lg:gap-16 items-start">

          {/* Info */}
          <div>
            <h2 className="font-serif font-light text-zinc-900 leading-tight mb-6"
              style={{ fontSize:'clamp(2rem, 4vw, 3.5rem)' }}>
              Cerca de todo,<br />
              <em className="not-italic" style={{ color:'#b8934a' }}>lejos del ruido</em>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-10">
              Acceso completamente asfaltado hasta la entrada del proyecto. Coordenadas precisas para llegar sin complicaciones.
            </p>

            {/* Distancias */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {tags.map((t, i) => (
                <div key={i} className="bg-white border border-zinc-100 rounded-sm px-4 py-3.5">
                  <div className="font-serif text-xl font-light text-zinc-900 mb-0.5">{t.label}</div>
                  <div className="text-[11px] text-zinc-400">{t.icon} {t.sub}</div>
                </div>
              ))}
            </div>

            {/* Coords */}
            <div className="font-mono text-xs text-zinc-400 bg-white border border-zinc-100 px-4 py-3 rounded-sm mb-5">
              {LAT}° S · {LNG}° W · Región del Ñuble
            </div>

            <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-semibold text-zinc-700 border border-zinc-200 px-5 py-3 rounded-sm hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all tracking-widest uppercase">
              <Pin className="w-3.5 h-3.5" />
              Abrir en Google Maps
              <ExtLink className="w-3 h-3 opacity-50" />
            </a>
          </div>

          {/* Mapa grande */}
          <div className="relative">
            <div className="overflow-hidden rounded-sm shadow-xl border border-zinc-100">
              <iframe
                src={mapSrc}
                width="100%" height="560"
                style={{ border:0, display:'block' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Mirador del Ñuble"
              />
            </div>
            {/* Pin card sobre el mapa */}
            <div className="absolute -bottom-5 left-5 bg-white border border-zinc-100 shadow-lg px-5 py-3.5 rounded-sm flex items-center gap-3">
              <div className="w-7 h-7 bg-brand-700 rounded-sm flex items-center justify-center shrink-0">
                <Pin className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <div className="text-zinc-900 font-semibold text-sm leading-tight">Mirador del Ñuble</div>
                <div className="text-zinc-400 text-[11px]">15 min de Chillán · Vista satélite</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// CONTACTO — minimal, generoso
// ─────────────────────────────────────────────────────────────

function Contacto() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', interest:'', msg:'' })
  const [sent, setSent] = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const inp = 'w-full border-b border-zinc-200 text-zinc-900 placeholder-zinc-300 text-sm py-3.5 focus:outline-none focus:border-zinc-500 transition-colors bg-transparent'

  return (
    <section id="contacto" className="bg-white py-24 lg:py-36 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Info */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="block h-px w-12 bg-zinc-200" />
              <span className="text-[10px] text-zinc-400 tracking-[0.3em] uppercase font-medium">Contacto</span>
            </div>

            {/* Logo del proyecto */}
            <img src={LOGO_G} alt="Mirador del Ñuble"
              className="h-10 w-auto object-contain object-left mb-8 opacity-60"
            />

            <h2 className="font-serif font-light text-zinc-900 leading-tight mb-6"
              style={{ fontSize:'clamp(2rem, 4vw, 3.5rem)' }}>
              ¿Listo para<br />
              <em className="not-italic" style={{ color:'#b8934a' }}>dar el primer paso?</em>
            </h2>

            <p className="text-zinc-400 text-sm leading-relaxed mb-12">
              Un asesor te contactará a la brevedad con disponibilidad, precios actualizados y toda la información del proceso de compra en verde.
            </p>

            <div className="space-y-5">
              {[
                { Icon:Phone, label:'Teléfono',  val:'+56 9 4567 8901',        href:'tel:+56945678901' },
                { Icon:Mail,  label:'Email',     val:'ventas@propertymaps.cl',  href:'mailto:ventas@propertymaps.cl' },
                { Icon:Pin,   label:'Proyecto',  val:'15 min de Chillán · Ñuble', href:null },
              ].map(({ Icon, label, val, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <Icon className="w-4 h-4 text-zinc-300 shrink-0" />
                  <div>
                    <div className="text-[9px] text-zinc-300 tracking-[0.25em] uppercase mb-0.5">{label}</div>
                    {href
                      ? <a href={href} className="text-zinc-700 text-sm hover:text-zinc-900 transition-colors">{val}</a>
                      : <span className="text-zinc-700 text-sm">{val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-zinc-50 rounded-sm p-8 lg:p-10 border border-zinc-100">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-5">
                <div className="w-14 h-14 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center">
                  <Check className="w-7 h-7 text-brand-600" />
                </div>
                <h3 className="font-serif text-2xl font-light text-zinc-900">Solicitud enviada</h3>
                <p className="text-zinc-400 max-w-xs text-sm leading-relaxed">
                  Te contactaremos dentro de las próximas 24 horas hábiles con toda la información.
                </p>
                <button onClick={() => setSent(false)} className="text-zinc-400 text-xs hover:text-zinc-600 mt-2 transition-colors">
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="space-y-7" noValidate>
                <div>
                  <p className="font-serif text-xl font-light text-zinc-800 mb-7">Solicitar información</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-7">
                  <input type="text"  placeholder="Nombre completo" required value={form.name}  onChange={set('name')}  className={inp} />
                  <input type="tel"   placeholder="+56 9 XXXX XXXX"          value={form.phone} onChange={set('phone')} className={inp} />
                </div>
                <input type="email" placeholder="Correo electrónico" required value={form.email} onChange={set('email')} className={inp} />
                <select value={form.interest} onChange={set('interest')} className={`${inp} appearance-none cursor-pointer`}>
                  <option value="">Parcela de interés…</option>
                  <option value="rio">Parcela Río — desde $14.900.000</option>
                  <option value="bosque">Parcela Bosque — consultar precio</option>
                  <option value="grande">Parcela Grande — consultar precio</option>
                  <option value="asesoria">No sé aún, quiero asesoría</option>
                </select>
                <textarea placeholder="Mensaje (opcional)" rows={3}
                  value={form.msg} onChange={set('msg')} className={`${inp} resize-none`} />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <span className="text-zinc-300 text-xs">Datos confidenciales · Sin spam</span>
                  <button type="submit"
                    className="inline-flex items-center gap-2.5 bg-zinc-900 text-white text-[11px] font-semibold px-8 py-4 rounded-sm hover:bg-zinc-700 transition-colors tracking-widest uppercase shrink-0">
                    Enviar solicitud
                    <Arrow className="w-3.5 h-3.5" />
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

// ─────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10">

          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-6 h-6 bg-brand-700 rounded flex items-center justify-center">
                <span className="text-white text-[9px] font-bold tracking-wider">PM</span>
              </div>
              <span className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase">Property Maps</span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed mb-5 max-w-[200px]">
              Corretaje y gestión de subdivisiones agrícolas premium en el sur de Chile.
            </p>
            <img src={LOGO_W} alt="Mirador del Ñuble"
              className="h-7 w-auto object-contain object-left opacity-25 mb-5"
            />
            <a href="#" className="w-8 h-8 bg-zinc-800 border border-zinc-700 rounded-sm inline-flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
              <IG className="w-3.5 h-3.5" />
            </a>
          </div>

          {[
            { title:'Navegación', links:['El Proyecto','Parcelas','Galería','Ubicación','Contacto'] },
            { title:'Empresa',   links:['Sobre Property Maps','Proyectos','Prensa'] },
            { title:'Legal',     links:['Privacidad','Términos','Normativa SAG'] },
          ].map(col => (
            <div key={col.title}>
              <h5 className="text-zinc-500 text-[9px] font-bold tracking-[0.25em] uppercase mb-5">{col.title}</h5>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l}><a href="#" className="text-zinc-600 text-xs hover:text-zinc-300 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-7 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-xs">© {year} Property Maps SpA. Todos los derechos reservados.</p>
          <p className="text-zinc-700 text-xs">Precios referenciales · Proyecto en preventa · Sujeto a disponibilidad</p>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Proyecto />
        <VideoShowcase />
        <Parcelas />
        <Galeria />
        <Ventajas />
        <Ubicacion />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}
