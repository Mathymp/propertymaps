import { useState, useEffect } from 'react'

// ─────────────────────────────────────────────────────────────
// CLOUDINARY
// ─────────────────────────────────────────────────────────────

const CLOUD  = 'dysqraxnh'
const FOLDER = 'mirador-nuble'

// Fotos: vibrance máx, saturación fuerte, contraste, sharpness, brightness
const T_HERO = 'f_auto,q_auto:best,w_1920,e_vibrance:100,e_saturation:70,e_contrast:40,e_sharpen:150,e_brightness:8'
const T_SECT = 'f_auto,q_auto:best,w_1100,e_vibrance:100,e_saturation:70,e_contrast:40,e_sharpen:150,e_brightness:8'
const T_GAL  = 'f_auto,q_auto:best,w_1200,e_vibrance:100,e_saturation:70,e_contrast:40,e_sharpen:150,e_brightness:8'
const T_LOGO = 'f_auto,q_auto:best,w_480'

const img = (name, t = T_HERO) => `https://res.cloudinary.com/${CLOUD}/image/upload/${t}/${FOLDER}/${name}`

const LOGO_BLANCO = img('logo-mirador-blanco', T_LOGO)
const LOGO_VERDE  = img('logo-mirador-verde',  T_LOGO)
const VIDEO_URL   = `https://res.cloudinary.com/${CLOUD}/video/upload/vc_h264,q_auto:low,w_1280,fps_24/${FOLDER}/video-hero.mp4`

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

// TODAS las parcelas disponibles — proyecto en preventa verde
const LOTS = [
  { id:1,  label:'P-01', size:'5.000 m²',  price:'$14.900.000', view:'Vista Río Ñuble' },
  { id:2,  label:'P-02', size:'5.500 m²',  price:'$15.950.000', view:'Vista Río Ñuble' },
  { id:3,  label:'P-03', size:'6.000 m²',  price:'$16.800.000', view:'Vista cordillera' },
  { id:4,  label:'P-04', size:'7.200 m²',  price:'$19.440.000', view:'Vista cordillera' },
  { id:5,  label:'P-05', size:'8.000 m²',  price:'Consultar',   view:'Vista 360°',       star: true },
  { id:6,  label:'P-06', size:'6.800 m²',  price:'$18.360.000', view:'Lomaje poniente' },
  { id:7,  label:'P-07', size:'5.200 m²',  price:'$15.080.000', view:'Lomaje poniente' },
  { id:8,  label:'P-08', size:'5.800 m²',  price:'$16.530.000', view:'Vista Río Ñuble' },
  { id:9,  label:'P-09', size:'7.500 m²',  price:'Consultar',   view:'Vista Río Ñuble',  star: true },
  { id:10, label:'P-10', size:'9.200 m²',  price:'Consultar',   view:'Vista panorámica', star: true },
  { id:11, label:'P-11', size:'6.100 m²',  price:'$17.385.000', view:'Lomaje sur' },
  { id:12, label:'P-12', size:'5.600 m²',  price:'$15.960.000', view:'Lomaje sur' },
  { id:13, label:'P-13', size:'6.400 m²',  price:'Consultar',   view:'Vista bosque' },
  { id:14, label:'P-14', size:'7.800 m²',  price:'Consultar',   view:'Vista bosque',     star: true },
  { id:15, label:'P-15', size:'10.500 m²', price:'Consultar',   view:'Vista 360°',       star: true },
  { id:16, label:'P-16', size:'8.200 m²',  price:'Consultar',   view:'Lomaje oriente' },
  { id:17, label:'P-17', size:'6.700 m²',  price:'$19.095.000', view:'Lomaje oriente' },
  { id:18, label:'P-18', size:'5.900 m²',  price:'$16.815.000', view:'Vista valle' },
  { id:19, label:'P-19', size:'7.100 m²',  price:'Consultar',   view:'Vista valle' },
  { id:20, label:'P-20', size:'12.000 m²', price:'Consultar',   view:'Parcela premium',  star: true },
]

const GALLERY = [
  { id:1, src: img('vista-aerea-bosque-lago', T_GAL), alt:'Vista aérea del proyecto y bosque',        cls:'col-span-2 row-span-2' },
  { id:2, src: img('hero-terreno-vista-rio',  T_GAL), alt:'Vista al Río Ñuble',                      cls:'col-span-1 row-span-1' },
  { id:3, src: img('rio-nuble-meandros-1',    T_GAL), alt:'Meandros del Río Ñuble',                  cls:'col-span-1 row-span-1' },
  { id:4, src: img('camino-interior-montanas',T_GAL), alt:'Vista a la cordillera desde el terreno',  cls:'col-span-1 row-span-2' },
  { id:5, src: img('bosque-con-rio-al-fondo', T_GAL), alt:'Bosque nativo con Río Ñuble al fondo',   cls:'col-span-1 row-span-1' },
  { id:6, src: img('camino-interior-bosque',  T_GAL), alt:'Camino interior del proyecto',            cls:'col-span-1 row-span-1' },
]

const VENTAJAS = [
  { ico:'🛡️', title:'Escrituración garantizada',          desc:'100% transparente desde el primer pago. Sin letra chica. Tu inversión protegida en todo momento.',            val:'100%' },
  { ico:'📈', title:'Precio de lanzamiento — compra ahora', desc:'El mejor precio es hoy. Una vez emitidos los roles, la plusvalía sube y el precio también.',                val:'Ahora' },
  { ico:'🛣️', title:'Acceso asfaltado + vialidad interior', desc:'Camino 100% asfaltado hasta la entrada. Caminos interiores compactados, acceso cómodo todo el año.',      val:'✔' },
  { ico:'💧', title:'Agua potable y electricidad incluidos', desc:'Servicios básicos disponibles en cada sitio. Todo listo para construir en cuanto obtengas el permiso.', val:'✔' },
  { ico:'🌊', title:'Vistas y acceso al Río Ñuble',         desc:'El Río Ñuble como fondo permanente de tu propiedad. Paisaje natural único a pocos minutos.',              val:'✔' },
  { ico:'💳', title:'Financiamiento directo y flexible',    desc:'Pie accesible, cuotas adaptadas a tu presupuesto. Sin trámites bancarios complicados.',                   val:'Flex.' },
]

const PROX = [
  { time:'3',    unit:'min',    place:'Puente El Ala',  note:'Acceso principal · camino asfaltado' },
  { time:'15',   unit:'min',    place:'Chillán',        note:'Servicios, hospitales, comercio' },
  { time:'1:20', unit:'horas',  place:'Concepción',     note:'Ciudad regional · aeropuerto' },
]

const MAP_TAGS = [
  '📍 3 min · Puente El Ala',
  '🏙️ 15 min · Chillán',
  '🚗 1h 20 · Concepción',
  '🌊 Vista directa · Río Ñuble',
  '🛣️ Acceso 100% asfaltado',
  '🏔️ 75 km · Termas de Chillán',
  '⛷️ 70 km · Valle Las Trancas',
]

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const Arrow    = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
const Check    = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
const MapPin   = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
const Phone    = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
const Mail     = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
const ExtLink  = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
const Chevron  = p => <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
const Instagram= p => <svg {...p} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>

// ─────────────────────────────────────────────────────────────
// LABEL
// ─────────────────────────────────────────────────────────────

function Label({ text, gold }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className={`block w-6 h-px ${gold ? 'bg-amber-400' : 'bg-brand-500'}`} />
      <span className={`text-[10px] font-bold tracking-[0.32em] uppercase ${gold ? 'text-amber-400' : 'text-brand-500'}`}>
        {text}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label:'El Proyecto', href:'#proyecto'  },
    { label:'Parcelas',    href:'#parcelas'  },
    { label:'Galería',     href:'#galeria'   },
    { label:'Ubicación',   href:'#ubicacion' },
    { label:'Contacto',    href:'#contacto'  },
  ]

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#080f08]/95 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/40' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between py-5">

        <a href="#" className="flex items-center gap-3">
          <div className={`w-7 h-7 flex items-center justify-center rounded transition-all ${scrolled ? 'bg-brand-600' : 'bg-white/10 border border-white/20'}`}>
            <span className="text-white text-[10px] font-bold tracking-wider">PM</span>
          </div>
          <span className={`text-[12px] font-semibold tracking-[0.22em] uppercase transition-colors ${scrolled ? 'text-white' : 'text-white/80'}`}>
            Property Maps
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-[12px] font-medium text-white/60 hover:text-white tracking-wide transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contacto"
            className="text-[12px] font-bold px-5 py-2.5 border border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-black tracking-widest uppercase rounded-sm transition-all">
            Cotizar
          </a>
        </nav>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-1">
          <div className="space-y-[5px]">
            <span className={`block w-6 h-[2px] bg-current transition-all ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-[2px] bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] bg-current transition-all ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#080f08] border-t border-white/5 px-6 pt-2 pb-6">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center justify-between py-3.5 text-sm text-white/70 border-b border-white/5 last:border-0">
              {l.label}
              <Arrow className="w-3 h-3 text-white/30" />
            </a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)}
            className="block text-center mt-5 py-3 border border-amber-400/50 text-amber-400 text-sm font-bold tracking-widest uppercase rounded-sm">
            Cotizar Parcela
          </a>
        </div>
      )}
    </header>
  )
}

// ─────────────────────────────────────────────────────────────
// HERO — video de fondo, logo centrado, oscuro dramático
// ─────────────────────────────────────────────────────────────

function HeroSection() {
  const [videoOk,   setVideoOk]   = useState(false)
  const [videoFail, setVideoFail] = useState(false)

  const heroPoster = img('hero-terreno-vista-rio', T_HERO)

  return (
    <section className="relative min-h-svh flex flex-col justify-end overflow-hidden bg-[#040a04] grain">

      {/* ── Background (video sobre foto) ─────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Foto con Ken Burns — visible mientras carga video o si falla */}
        <img
          src={heroPoster}
          alt="Mirador del Ñuble — vista aérea"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ${videoOk ? 'opacity-0' : 'opacity-100'} ${videoFail ? 'animate-kenburns' : ''}`}
          loading="eager"
          fetchPriority="high"
          style={videoFail ? {} : {}}
        />
        {/* Video de fondo (si está disponible en Cloudinary) */}
        {!videoFail && (
          <video
            autoPlay muted loop playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ${videoOk ? 'opacity-100' : 'opacity-0'}`}
            onLoadedData={() => setVideoOk(true)}
            onError={() => setVideoFail(true)}
            poster={heroPoster}
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        )}

        {/* Overlays — degradé oscuro dramático */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      {/* ── Contenido ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pb-20 lg:pb-28 pt-36">

        {/* Logo Mirador del Ñuble — prominente */}
        <div className="mb-10">
          <img
            src={LOGO_BLANCO}
            alt="Mirador del Ñuble"
            className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-amber-400" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-400">
            Preventa en Verde · Región del Ñuble · Chile
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-extrabold leading-[0.9] tracking-tight text-white mb-6">
          <span className="block text-5xl sm:text-7xl lg:text-[88px]">Parcelas junto</span>
          <span className="block text-5xl sm:text-7xl lg:text-[88px] text-amber-400 ml-4 sm:ml-10 lg:ml-20">
            al Río Ñuble
          </span>
        </h1>

        <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-lg mb-3">
          Proyecto en proceso de obtención de Rol individual SAG. La oportunidad de adquirir al
          <strong className="text-white"> precio de lanzamiento</strong> — antes de que la plusvalía llegue.
        </p>
        <p className="text-white/40 text-sm mb-10">
          20 parcelas · 5.000 a 12.000 m² · Acceso asfaltado · 15 min de Chillán
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <a href="#parcelas"
            className="inline-flex items-center gap-2.5 bg-amber-400 text-black text-sm font-bold px-8 py-4 rounded-sm hover:bg-amber-300 transition-all tracking-wider uppercase">
            Ver Parcelas
            <Arrow className="w-4 h-4" />
          </a>
          <a href="#contacto"
            className="inline-flex items-center gap-2.5 border border-white/25 text-white text-sm font-medium px-8 py-4 rounded-sm hover:bg-white/8 transition-all tracking-wide">
            Hablar con un Asesor
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
          {[
            { val:'$14,9M',   label:'Precio desde',         note:'Precio de lanzamiento' },
            { val:'5.000 m²', label:'Superficie mínima',    note:'Hasta 12.000 m²' },
            { val:'2027',     label:'Entrega estimada',      note:'Proyecto en verde' },
            { val:'15 min',   label:'de Chillán',           note:'Acceso asfaltado' },
          ].map((s, i) => (
            <div key={i} className="bg-black/30 backdrop-blur-sm px-5 py-5">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 leading-none mb-1">{s.val}</div>
              <div className="text-[10px] font-bold text-white/80 tracking-[0.18em] uppercase">{s.label}</div>
              <div className="text-[10px] text-white/30 mt-0.5">{s.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-30 pointer-events-none">
        <span className="text-white text-[9px] tracking-[0.3em] uppercase">Descubrir</span>
        <Chevron className="w-4 h-4 text-white animate-bounce" />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// PROXIMIDAD — strip oscuro con 3 números grandes
// ─────────────────────────────────────────────────────────────

function ProximitySection() {
  return (
    <section className="bg-[#080f08] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
          {PROX.map((p, i) => (
            <div key={i} className="py-10 sm:py-12 px-0 sm:px-10 first:pl-0 last:pr-0">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl lg:text-6xl font-black text-white tabular-nums">{p.time}</span>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">{p.unit}</span>
              </div>
              <div className="text-white font-semibold text-lg mb-0.5">{p.place}</div>
              <div className="text-white/30 text-xs">{p.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// PROYECTO — foto full-bleed, logo, contenido oscuro
// ─────────────────────────────────────────────────────────────

function ProjectSection() {
  const features = [
    'Caminos interiores compactados y estabilizados',
    'Vista directa y acceso al Río Ñuble',
    'A 3 minutos del Puente El Ala (acceso asfaltado)',
    'Agua potable rural y electricidad en cada sitio',
    'Vegetación nativa: robles, avellanos, boldos',
    'Escrituración garantizada al obtener Rol SAG',
    'Parcelas desde 5.000 m² · Financiamiento disponible',
  ]

  return (
    <section id="proyecto" className="bg-[#080f08]">
      <div className="grid lg:grid-cols-2 min-h-[80vh]">

        {/* Foto full-height */}
        <div className="relative overflow-hidden min-h-[50vh] lg:min-h-0">
          <img
            src={img('terreno-camino-rio-nuble', T_SECT)}
            alt="Terreno con vista al Río Ñuble"
            className="absolute inset-0 w-full h-full object-cover hover:scale-103 transition-transform duration-1000"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#080f08]/60" />
          {/* Caption */}
          <div className="absolute bottom-5 left-5 text-white/40 text-[10px] tracking-widest uppercase">
            Vistas reales del proyecto · Región del Ñuble
          </div>
        </div>

        {/* Contenido */}
        <div className="px-8 lg:px-16 py-20 lg:py-28 flex flex-col justify-center">
          <Label text="El Proyecto" gold />

          {/* Logo del proyecto aquí */}
          <img
            src={LOGO_BLANCO}
            alt="Mirador del Ñuble"
            className="h-10 w-auto object-contain object-left mb-8 opacity-80"
            loading="lazy"
          />

          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
            Vive donde el río<br />
            <span className="text-amber-400">y la montaña se encuentran</span>
          </h2>

          <p className="text-white/55 leading-relaxed mb-3 text-[15px]">
            Mirador del Ñuble está ubicado a <strong className="text-white">3 minutos del Puente El Ala</strong>, con
            acceso directo y vistas privilegiadas al Río Ñuble. Un entorno natural único a pocos minutos de la ciudad.
          </p>
          <p className="text-white/40 text-sm leading-relaxed mb-10">
            Proyecto en proceso de obtención de Rol SAG individual. Subdivisión en trámite.
            Preventa en verde con entrega estimada para el 2° semestre de 2027.
          </p>

          <ul className="space-y-3 mb-10">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">{f}</span>
              </li>
            ))}
          </ul>

          {/* Badge preventa */}
          <div className="inline-flex items-center gap-2.5 border border-amber-400/30 bg-amber-400/5 px-4 py-2.5 rounded-sm self-start">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase">
              Preventa · Precio de Lanzamiento · Cupos Limitados
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// PARCELAS — loteo interactivo, todas disponibles
// ─────────────────────────────────────────────────────────────

function ParcelasSection() {
  const [sel, setSel] = useState(null)

  return (
    <section id="parcelas" className="bg-[#040a04] py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <Label text="Disponibilidad · 20 Parcelas" gold />
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Todas disponibles —<br />
              <span className="text-amber-400">elige la tuya hoy</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 border border-brand-500/30 bg-brand-500/8 px-4 py-3 rounded-sm self-start lg:self-auto">
            <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse shrink-0" />
            <span className="text-brand-400 text-xs font-bold tracking-widest uppercase">20/20 disponibles</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
          {LOTS.map(lot => {
            const isSel = sel?.id === lot.id
            return (
              <button key={lot.id} onClick={() => setSel(isSel ? null : lot)}
                className={`relative p-4 text-left border rounded-sm transition-all duration-200 group ${
                  isSel
                    ? 'bg-amber-400/12 border-amber-400 scale-[1.02] shadow-lg shadow-amber-400/10'
                    : 'bg-white/[0.03] border-white/8 hover:border-brand-500/50 hover:bg-brand-500/5'
                }`}>
                {lot.star && (
                  <span className="absolute top-2 right-2 text-amber-400 text-[10px]">★</span>
                )}
                <div className={`font-bold text-base mb-1 ${isSel ? 'text-amber-400' : 'text-white'}`}>
                  {lot.label}
                </div>
                <div className="text-white/40 text-xs mb-3">{lot.size}</div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full bg-brand-500/15 text-brand-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                  Disponible
                </div>
              </button>
            )
          })}
        </div>

        {sel && (
          <div className="mt-4 border border-amber-400/20 bg-amber-400/5 rounded-sm p-6 lg:p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { k:'Parcela',    v: sel.label,   gold: true },
                { k:'Superficie', v: sel.size,    gold: false },
                { k:'Precio',     v: sel.price,   gold: true },
                { k:'Vista',      v: sel.view,    gold: false },
              ].map(({ k, v, gold }) => (
                <div key={k}>
                  <div className="text-white/25 text-[10px] tracking-[0.25em] uppercase mb-1.5">{k}</div>
                  <div className={`font-bold text-xl ${gold ? 'text-amber-400' : 'text-white'}`}>{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-amber-400/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-white/40 text-sm">
                Interesado en <span className="text-white font-semibold">{sel.label}</span> — {sel.view}
              </p>
              <a href="#contacto"
                className="inline-flex items-center gap-2 bg-amber-400 text-black text-sm font-bold px-6 py-3 rounded-sm hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 tracking-wide">
                Cotizar {sel.label}
                <Arrow className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        <p className="text-white/20 text-[10px] tracking-[0.2em] uppercase text-center mt-8">
          ★ Parcelas destacadas por vista o superficie especial
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// VENTAJAS
// ─────────────────────────────────────────────────────────────

function VentajasSection() {
  return (
    <section className="bg-[#080f08] border-t border-white/5 py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <Label text="Por qué invertir ahora" gold />
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Todo incluido.<br />
              <span className="text-amber-400">Nada oculto.</span>
            </h2>
          </div>
          <p className="text-white/35 text-sm leading-relaxed max-w-xs lg:text-right">
            El precio de lanzamiento en verde es tu única ventana para entrar antes de la plusvalía.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VENTAJAS.map((v, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/8 rounded-sm p-6 lg:p-7 flex gap-4 hover:border-amber-400/25 hover:bg-amber-400/3 transition-all group">
              <div className="text-3xl shrink-0 mt-0.5">{v.ico}</div>
              <div className="flex-1">
                <div className="font-bold text-white text-[14px] mb-1.5">{v.title}</div>
                <div className="text-white/40 text-sm leading-relaxed">{v.desc}</div>
              </div>
              <div className="text-amber-400 font-black text-sm shrink-0 self-start ml-2 group-hover:scale-110 transition-transform">{v.val}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// GALERÍA — bento dramático sobre fondo negro
// ─────────────────────────────────────────────────────────────

function GallerySection() {
  return (
    <section id="galeria" className="bg-black py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-5">
          <div>
            <Label text="Galería · El Entorno" gold />
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              El paisaje que<br />
              <span className="text-amber-400">te espera cada día</span>
            </h2>
          </div>
          <p className="text-white/30 text-sm max-w-xs lg:text-right leading-relaxed">
            Naturaleza nativa, lomajes suaves, el Río Ñuble y la cordillera como horizonte permanente.
          </p>
        </div>

        <div className="grid gap-2 lg:gap-2.5"
          style={{ gridTemplateColumns:'repeat(3,1fr)', gridTemplateRows:'280px 280px' }}>
          {GALLERY.map(g => (
            <div key={g.id} className={`overflow-hidden rounded-sm group relative ${g.cls}`}>
              <img src={g.src} alt={g.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide">
                {g.alt}
              </div>
            </div>
          ))}
        </div>

        <p className="text-white/20 text-[10px] tracking-[0.25em] uppercase text-center mt-6">
          Imágenes del terreno · Optimizadas vía Cloudinary · Región del Ñuble, Chile
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// UBICACIÓN — mapa satélite + tags
// ─────────────────────────────────────────────────────────────

function UbicacionSection() {
  const LAT = '-36.578819', LNG = '-72.256633'
  const mapSrc = `https://maps.google.com/maps?q=${LAT},${LNG}&t=k&z=15&ie=UTF8&iwloc=&output=embed`

  return (
    <section id="ubicacion" className="bg-[#040a04] border-t border-white/5 py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16 items-start">

          <div>
            <Label text="Ubicación" gold />
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              A minutos de todo,<br />
              <span className="text-amber-400">en plena naturaleza</span>
            </h2>
            <p className="text-white/45 leading-relaxed mb-8 text-[15px]">
              Acceso por camino completamente asfaltado hasta la entrada del proyecto.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {MAP_TAGS.map(t => (
                <span key={t} className="bg-white/4 border border-white/8 text-white/60 text-xs px-3 py-1.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>

            <div className="font-mono text-xs text-white/25 bg-white/3 border border-white/6 px-4 py-3 rounded-sm mb-6">
              📌 {LAT}° S · {LNG}° W · Región del Ñuble, Chile
            </div>

            <a href={`https://maps.google.com/?q=${LAT},${LNG}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-amber-400/40 text-amber-400 text-sm font-bold px-6 py-3.5 rounded-sm hover:bg-amber-400 hover:text-black transition-all tracking-wide">
              <MapPin className="w-4 h-4" />
              Abrir en Google Maps
              <ExtLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-sm shadow-2xl shadow-black ring-1 ring-white/8">
              <iframe
                src={mapSrc}
                width="100%" height="520"
                style={{ border:0, display:'block' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Mirador del Ñuble"
              />
            </div>
            <div className="absolute -bottom-4 left-5 bg-[#080f08] border border-white/8 pl-4 pr-6 py-3 rounded-sm flex items-center gap-3 shadow-xl">
              <div className="w-7 h-7 bg-brand-700/60 border border-brand-500/40 rounded-sm flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Mirador del Ñuble</div>
                <div className="text-white/35 text-[11px]">Vista satélite · 15 min de Chillán</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// CONTACTO
// ─────────────────────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', interest:'', msg:'' })
  const [sent, setSent] = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const inp = 'w-full bg-transparent border-b border-white/15 text-white placeholder-white/25 text-sm py-3.5 focus:outline-none focus:border-amber-400/60 transition-colors'

  return (
    <section id="contacto" className="bg-[#040a04] border-t border-white/5 py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">

          {/* Info */}
          <div>
            <Label text="Contacto" gold />

            {/* Logo del proyecto en contacto */}
            <img src={LOGO_BLANCO} alt="Mirador del Ñuble"
              className="h-12 w-auto object-contain object-left mb-7 opacity-70"
            />

            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              ¿Listo para dar<br />
              <span className="text-amber-400">el primer paso?</span>
            </h2>
            <p className="text-white/45 leading-relaxed mb-12 text-[15px]">
              Un asesor te contactará a la brevedad con disponibilidad, precios actualizados y toda
              la información sobre el proceso de compra en verde.
            </p>

            <div className="space-y-5">
              {[
                { Icon:Phone,  label:'Teléfono',  val:'+56 9 4567 8901',      href:'tel:+56945678901' },
                { Icon:Mail,   label:'Email',     val:'ventas@propertymaps.cl', href:'mailto:ventas@propertymaps.cl' },
                { Icon:MapPin, label:'Proyecto',  val:'15 min de Chillán · Ñuble', href: null },
              ].map(({ Icon, label, val, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-sm bg-white/4 border border-white/8 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-amber-400/70" />
                  </div>
                  <div>
                    <div className="text-white/25 text-[9px] tracking-[0.25em] uppercase mb-0.5">{label}</div>
                    {href
                      ? <a href={href} className="text-white text-sm font-medium hover:text-amber-400 transition-colors">{val}</a>
                      : <span className="text-white text-sm font-medium">{val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario */}
          <div>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 gap-5">
                <div className="w-16 h-16 rounded-full bg-brand-600/20 border border-brand-500/40 flex items-center justify-center">
                  <Check className="w-8 h-8 text-brand-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Solicitud Enviada</h3>
                <p className="text-white/40 max-w-sm text-sm leading-relaxed">
                  Un asesor de Property Maps se pondrá en contacto contigo dentro de las próximas
                  24 horas hábiles con información detallada sobre Mirador del Ñuble.
                </p>
                <button onClick={() => setSent(false)} className="text-amber-400 text-sm hover:text-amber-300 transition-colors mt-2">
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="space-y-8" noValidate>
                <div className="grid sm:grid-cols-2 gap-8">
                  <input type="text" placeholder="Nombre completo" required value={form.name} onChange={set('name')} className={inp} />
                  <input type="tel"  placeholder="+56 9 XXXX XXXX"          value={form.phone} onChange={set('phone')} className={inp} />
                </div>
                <input type="email" placeholder="Correo electrónico" required value={form.email} onChange={set('email')} className={inp} />
                <select value={form.interest} onChange={set('interest')}
                  className={`${inp} appearance-none cursor-pointer`} style={{ background:'transparent' }}>
                  <option value="" style={{ background:'#040a04' }}>Parcela de interés…</option>
                  <option value="rio"      style={{ background:'#040a04' }}>Parcela Río – desde $14.900.000</option>
                  <option value="bosque"   style={{ background:'#040a04' }}>Parcela Bosque – Consultar precio</option>
                  <option value="grande"   style={{ background:'#040a04' }}>Parcela Grande – Consultar precio</option>
                  <option value="asesoria" style={{ background:'#040a04' }}>No sé aún, quiero asesoría</option>
                </select>
                <textarea placeholder="Mensaje o consulta (opcional)" rows={3}
                  value={form.msg} onChange={set('msg')} className={`${inp} resize-none`} />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-white/20 text-xs">Datos confidenciales. Sin spam.</p>
                  <button type="submit"
                    className="inline-flex items-center gap-2.5 bg-amber-400 text-black text-sm font-bold px-8 py-4 rounded-sm hover:bg-amber-300 transition-colors tracking-widest uppercase shrink-0">
                    Enviar
                    <Arrow className="w-4 h-4" />
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
  const cols = {
    Navegación: ['El Proyecto','Parcelas','Galería','Ubicación','Contacto'],
    Empresa:    ['Sobre Property Maps','Proyectos en Desarrollo','Prensa'],
    Legal:      ['Política de Privacidad','Términos de Uso','Normativa SAG'],
  }

  return (
    <footer className="bg-[#020702] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10">

          <div className="col-span-2 lg:col-span-1">
            {/* Property Maps logo (barra superior ya tiene PM) */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-brand-700 rounded flex items-center justify-center shrink-0">
                <span className="text-white text-[10px] font-bold tracking-wider">PM</span>
              </div>
              <span className="text-white text-[12px] font-semibold tracking-[0.2em] uppercase">Property Maps</span>
            </div>
            <p className="text-white/25 text-xs leading-relaxed mb-5 max-w-[200px]">
              Corretaje y gestión de subdivisiones agrícolas premium en el sur de Chile.
            </p>
            {/* Mirador del Ñuble logo en footer */}
            <img src={LOGO_BLANCO} alt="Mirador del Ñuble"
              className="h-8 w-auto object-contain object-left opacity-30 mb-5"
            />
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 bg-white/4 border border-white/6 rounded-sm flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {Object.entries(cols).map(([cat, items]) => (
            <div key={cat}>
              <h4 className="text-white/40 text-[10px] font-bold tracking-[0.25em] uppercase mb-5">{cat}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-white/25 text-xs hover:text-white/60 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-7 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/15 text-xs">© {year} Property Maps SpA. Todos los derechos reservados.</p>
          <p className="text-white/10 text-xs">Proyecto Mirador del Ñuble · Precios referenciales · Sujeto a disponibilidad</p>
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
        <HeroSection />
        <ProximitySection />
        <ProjectSection />
        <ParcelasSection />
        <VentajasSection />
        <GallerySection />
        <UbicacionSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
