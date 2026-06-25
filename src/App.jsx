import { useState, useEffect } from 'react'

// ─────────────────────────────────────────────────────────────
// CLOUDINARY — fotos reales del proyecto (subidas vía upload script)
// Mejora automática: vibrance, saturación, nitidez, formato auto
// ─────────────────────────────────────────────────────────────

const CLOUD = 'dysqraxnh'
const FOLDER = 'mirador-nuble'

// Para fotos subidas a Cloudinary: aplica transformaciones potentes
function cldUp(name, transforms = 'f_auto,q_auto:best,w_1920,e_vibrance:85,e_saturation:50,e_sharpen:100,e_brightness:5') {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/${FOLDER}/${name}`
}

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const LOTS = [
  { id: 1,  label: 'L-01', size: '5.000 m²',  price: '$14.900.000', status: 'sold',      view: 'Vista Río Ñuble',  featured: false },
  { id: 2,  label: 'L-02', size: '5.500 m²',  price: '$15.950.000', status: 'sold',      view: 'Vista Río Ñuble',  featured: false },
  { id: 3,  label: 'L-03', size: '6.000 m²',  price: '$16.800.000', status: 'sold',      view: 'Vista cordillera', featured: false },
  { id: 4,  label: 'L-04', size: '7.200 m²',  price: '$19.440.000', status: 'sold',      view: 'Vista cordillera', featured: false },
  { id: 5,  label: 'L-05', size: '8.000 m²',  price: 'Consultar',   status: 'reserved',  view: 'Vista 360°',       featured: true  },
  { id: 6,  label: 'L-06', size: '6.800 m²',  price: '$18.360.000', status: 'available', view: 'Lomaje poniente',  featured: false },
  { id: 7,  label: 'L-07', size: '5.200 m²',  price: '$15.080.000', status: 'available', view: 'Lomaje poniente',  featured: false },
  { id: 8,  label: 'L-08', size: '5.800 m²',  price: '$16.530.000', status: 'available', view: 'Vista Río Ñuble',  featured: false },
  { id: 9,  label: 'L-09', size: '7.500 m²',  price: 'Consultar',   status: 'reserved',  view: 'Vista Río Ñuble',  featured: true  },
  { id: 10, label: 'L-10', size: '9.200 m²',  price: 'Consultar',   status: 'sold',      view: 'Vista panorámica', featured: false },
  { id: 11, label: 'L-11', size: '6.100 m²',  price: '$17.385.000', status: 'available', view: 'Lomaje sur',       featured: false },
  { id: 12, label: 'L-12', size: '5.600 m²',  price: '$15.960.000', status: 'available', view: 'Lomaje sur',       featured: false },
  { id: 13, label: 'L-13', size: '6.400 m²',  price: 'Consultar',   status: 'reserved',  view: 'Vista bosque',     featured: false },
  { id: 14, label: 'L-14', size: '7.800 m²',  price: 'Consultar',   status: 'reserved',  view: 'Vista bosque',     featured: true  },
  { id: 15, label: 'L-15', size: '10.500 m²', price: 'Consultar',   status: 'available', view: 'Vista 360°',       featured: true  },
  { id: 16, label: 'L-16', size: '8.200 m²',  price: 'Consultar',   status: 'available', view: 'Lomaje oriente',   featured: false },
  { id: 17, label: 'L-17', size: '6.700 m²',  price: '$19.095.000', status: 'sold',      view: 'Lomaje oriente',   featured: false },
  { id: 18, label: 'L-18', size: '5.900 m²',  price: '$16.815.000', status: 'available', view: 'Vista valle',      featured: false },
  { id: 19, label: 'L-19', size: '7.100 m²',  price: 'Consultar',   status: 'reserved',  view: 'Vista valle',      featured: false },
  { id: 20, label: 'L-20', size: '12.000 m²', price: 'Consultar',   status: 'available', view: 'Esquina premium',  featured: true  },
]

const GALLERY = [
  { id: 1, src: cldUp('dji-0181',                    'f_auto,q_auto:best,w_1400,e_vibrance:85,e_saturation:50,e_sharpen:100,e_brightness:5'), alt: 'Vista aérea dron — Mirador del Ñuble',     cls: 'col-span-2 row-span-2' },
  { id: 2, src: cldUp('hero-terreno-vista-rio',       'f_auto,q_auto:best,w_800,e_vibrance:85,e_saturation:50,e_sharpen:100,e_brightness:5'),  alt: 'Vista al Río Ñuble desde el terreno',      cls: 'col-span-1 row-span-1' },
  { id: 3, src: cldUp('rio-nuble-meandros-1',         'f_auto,q_auto:best,w_800,e_vibrance:85,e_saturation:50,e_sharpen:100,e_brightness:5'),  alt: 'Meandros del Río Ñuble',                   cls: 'col-span-1 row-span-1' },
  { id: 4, src: cldUp('camino-interior-montanas',     'f_auto,q_auto:best,w_900,e_vibrance:85,e_saturation:50,e_sharpen:100,e_brightness:5'),  alt: 'Vistas a la cordillera desde el proyecto', cls: 'col-span-1 row-span-2' },
  { id: 5, src: cldUp('bosque-con-rio-al-fondo',      'f_auto,q_auto:best,w_800,e_vibrance:85,e_saturation:50,e_sharpen:100,e_brightness:5'),  alt: 'Bosque nativo con el río al fondo',        cls: 'col-span-1 row-span-1' },
  { id: 6, src: cldUp('dji-0183',                    'f_auto,q_auto:best,w_800,e_vibrance:85,e_saturation:50,e_sharpen:100,e_brightness:5'),  alt: 'Fotografía aérea dron del proyecto',       cls: 'col-span-1 row-span-1' },
]

const STATUS_CFG = {
  available: {
    label: 'Disponible', dot: 'bg-brand-600', badge: 'bg-brand-50 text-brand-700',
    borderSel: 'border-brand-600', bgSel: 'bg-brand-50', textSel: 'text-brand-800', textSubSel: 'text-brand-600',
  },
  reserved: {
    label: 'Reservada', dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700',
    borderSel: 'border-amber-400', bgSel: 'bg-amber-50', textSel: 'text-amber-900', textSubSel: 'text-amber-700',
  },
  sold: {
    label: 'Vendida', dot: 'bg-zinc-500', badge: 'bg-zinc-800 text-zinc-400',
    borderSel: 'border-zinc-600', bgSel: 'bg-zinc-900', textSel: 'text-zinc-300', textSubSel: 'text-zinc-500',
  },
}

const MAP_TAGS = [
  '3 min · Puente El Ala',
  '15 min · Chillán',
  '1h 20 · Concepción',
  'Vista directa · Río Ñuble',
  'Acceso 100% asfaltado',
  '75 km · Termas de Chillán',
  '70 km · Ski Chillán',
  '95 km · Laguna Laja',
]

const VENTAJAS = [
  { ico: '🛡️', title: 'Escrituración garantizada',         desc: 'Proceso 100% transparente desde el primer pago. Tu inversión protegida en todo momento.', val: '100%' },
  { ico: '🏗️', title: 'Precio de lanzamiento en verde',    desc: 'Comprar ahora es el mejor precio. La plusvalía del proyecto trabaja a tu favor desde hoy.', val: '$14,9M' },
  { ico: '🛣️', title: 'Vialidad asfaltada + compactada',  desc: 'Acceso 100% asfaltado hasta la entrada. Caminos interiores estabilizados todo el año.', val: '✔' },
  { ico: '💧', title: 'Servicios básicos en cada sitio',   desc: 'Agua potable rural y electricidad disponibles. Todo listo para construir cuando quieras.', val: '✔' },
  { ico: '🌊', title: 'Vista y acceso al Río Ñuble',       desc: 'Paisaje natural único como fondo de tu vida. El río visible desde los sitios del proyecto.', val: '✔' },
  { ico: '💳', title: 'Financiamiento directo y flexible', desc: 'Pie accesible con cuotas adaptadas a tu presupuesto. Sin trámites bancarios complicados.', val: 'Flex.' },
]

// ─────────────────────────────────────────────────────────────
// SVG ICONS
// ─────────────────────────────────────────────────────────────

function IconCheck(p)     { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> }
function IconMapPin(p)    { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg> }
function IconChevronDown(p){ return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg> }
function IconArrowRight(p){ return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg> }
function IconPhone(p)     { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg> }
function IconMail(p)      { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> }
function IconExternalLink(p){ return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg> }
function IconInstagram(p) { return <svg {...p} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> }
function IconLinkedIn(p)  { return <svg {...p} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> }

// ─────────────────────────────────────────────────────────────
// SHARED
// ─────────────────────────────────────────────────────────────

function Label({ text, light }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={`block w-8 h-px ${light ? 'bg-brand-400' : 'bg-brand-600'}`} />
      <span className={`text-[11px] font-semibold tracking-[0.28em] uppercase ${light ? 'text-brand-400' : 'text-brand-600'}`}>
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
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Proyecto',  href: '#proyecto'  },
    { label: 'Parcelas',  href: '#loteo'     },
    { label: 'Ventajas',  href: '#ventajas'  },
    { label: 'Galería',   href: '#galeria'   },
    { label: 'Ubicación', href: '#ubicacion' },
    { label: 'Contacto',  href: '#contacto'  },
  ]

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/96 backdrop-blur-md shadow-sm' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between py-5">

        <a href="#" className="flex items-center gap-3">
          <div className={`w-8 h-8 flex items-center justify-center rounded-sm transition-colors ${scrolled ? 'bg-brand-600' : 'bg-white/15 border border-white/25'}`}>
            <span className="text-white text-[11px] font-bold tracking-widest">PM</span>
          </div>
          <span className={`text-[13px] font-semibold tracking-[0.2em] uppercase transition-colors ${scrolled ? 'text-zinc-900' : 'text-white'}`}>Property Maps</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className={`text-[13px] font-medium transition-colors hover:opacity-60 ${scrolled ? 'text-zinc-700' : 'text-white/85'}`}>
              {l.label}
            </a>
          ))}
          <a href="#contacto"
            className={`text-[13px] font-semibold px-5 py-2.5 rounded-sm transition-all ${scrolled ? 'bg-brand-600 text-white hover:bg-brand-700' : 'border border-white/35 text-white hover:bg-white/12'}`}>
            Cotizar
          </a>
        </nav>

        <button onClick={() => setOpen(!open)} aria-label="Menú"
          className={`lg:hidden flex flex-col gap-[5px] p-1 ${scrolled ? 'text-zinc-900' : 'text-white'}`}>
          <span className={`block w-6 h-[2px] bg-current transition-all origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-[2px] bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-current transition-all origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-zinc-100 px-6 pt-4 pb-6 space-y-1">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center justify-between py-3 text-sm font-medium text-zinc-700 border-b border-zinc-50 last:border-0">
              {l.label}
              <IconArrowRight className="w-3.5 h-3.5 text-zinc-300" />
            </a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)}
            className="block text-center mt-4 py-3.5 bg-brand-600 text-white text-sm font-semibold rounded-sm">
            Cotizar parcela
          </a>
        </div>
      )}
    </header>
  )
}

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────

function HeroSection() {
  const heroImg = cldUp('dji-0182', 'f_auto,q_auto:best,w_1920,e_vibrance:85,e_saturation:50,e_sharpen:100,e_brightness:8')

  return (
    <section className="relative min-h-svh flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Vista aérea Mirador del Ñuble"
          className="w-full h-full object-cover object-center"
          loading="eager" fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/92 via-zinc-900/40 to-zinc-900/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/65 via-zinc-950/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-20 lg:pb-28">
        <div className="flex items-center gap-3 mb-7">
          <span className="block w-8 h-px bg-brand-400" />
          <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-brand-400">
            Property Maps · Región del Ñuble · Chile
          </span>
        </div>

        <h1 className="font-extrabold leading-[0.88] tracking-tighter text-white">
          <span className="block text-6xl sm:text-8xl lg:text-[9rem]">Tu Parcela</span>
          <span className="block text-6xl sm:text-8xl lg:text-[9rem] text-brand-400 ml-6 sm:ml-12 lg:ml-24">
            junto al Río Ñuble
          </span>
        </h1>

        <p className="mt-7 text-zinc-300 text-base sm:text-lg font-light max-w-xl leading-relaxed">
          Parcelas privadas con vistas al río, rodeadas de naturaleza pura y a solo
          <strong className="text-white font-semibold"> 15 minutos de Chillán</strong>.
          Proyecto en verde con entrega el 2° semestre 2027.
        </p>

        <div className="flex flex-wrap gap-3 mt-9">
          <a href="#loteo"
            className="inline-flex items-center gap-2.5 bg-brand-500 text-white text-sm font-semibold px-7 py-4 rounded-sm hover:bg-brand-600 transition-colors tracking-wide">
            Ver parcelas
            <IconArrowRight className="w-4 h-4" />
          </a>
          <a href="#contacto"
            className="inline-flex items-center gap-2.5 border border-white/30 text-white text-sm font-medium px-7 py-4 rounded-sm hover:bg-white/10 transition-colors tracking-wide">
            Hablar con un asesor
          </a>
        </div>

        {/* Hero stats */}
        <div className="mt-14 lg:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: '$14,9M',    label: 'Precio desde',          sub: 'Precio de lanzamiento' },
            { value: '5.000 m²',  label: 'Superficie desde',      sub: 'Hasta 12.000 m²' },
            { value: '2027',      label: 'Entrega 2° Semestre',    sub: 'Proyecto en verde' },
            { value: '15 min',    label: 'de Chillán',            sub: 'Acceso asfaltado' },
          ].map((c, i) => (
            <div key={i} className="bg-white/[0.07] backdrop-blur-md border border-white/[0.11] rounded-sm px-4 py-4 sm:px-5">
              <div className="text-xl sm:text-2xl font-bold text-white leading-none mb-1.5">{c.value}</div>
              <div className="text-[11px] font-semibold text-brand-300 tracking-[0.18em] uppercase">{c.label}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{c.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-45 pointer-events-none">
        <span className="text-white text-[9px] tracking-[0.3em] uppercase">Descubrir</span>
        <IconChevronDown className="w-4 h-4 text-white animate-bounce" />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// PROXIMIDAD — strip
// ─────────────────────────────────────────────────────────────

function ProximitySection() {
  const items = [
    { time: '3',    unit: 'minutos', place: 'Puente El Ala',  note: 'Acceso principal al proyecto' },
    { time: '15',   unit: 'minutos', place: 'Chillán',        note: 'Servicios, comercio, hospitales' },
    { time: '1:20', unit: 'horas',   place: 'Concepción',     note: 'Gran ciudad regional' },
  ]

  return (
    <section className="bg-brand-950 py-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-brand-900/60">
          {items.map((it, i) => (
            <div key={i} className="py-10 sm:py-12 px-0 sm:px-10 first:pl-0 last:pr-0">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">{it.time}</span>
                <span className="text-brand-400 text-sm font-semibold uppercase tracking-widest">{it.unit}</span>
              </div>
              <div className="text-brand-300 font-bold text-lg mb-0.5">{it.place}</div>
              <div className="text-brand-400/60 text-xs">{it.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// PROYECTO
// ─────────────────────────────────────────────────────────────

function ProjectSection() {
  const projectImg = cldUp('terreno-camino-rio-nuble', 'f_auto,q_auto:best,w_900,e_vibrance:85,e_saturation:50,e_sharpen:100,e_brightness:5')

  const features = [
    'Caminos interiores compactados y estabilizados',
    'Vista directa y acceso al Río Ñuble',
    'A 3 minutos del Puente El Ala (acceso asfaltado)',
    'Agua potable rural y electricidad en cada sitio',
    'Vegetación nativa: robles, avellanos, boldos',
    'Garantía de compra con escrituración transparente',
    'Parcelas desde 5.000 m² · Financiamiento disponible',
    'Entrega garantizada 2° semestre 2027',
  ]

  return (
    <section id="proyecto" className="bg-white py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-24 items-center">

          <div className="order-2 lg:order-1">
            <Label text="El Proyecto" />
            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-5">
              Vive donde el río<br />
              <span className="text-brand-600">y la montaña se encuentran</span>
            </h2>
            <p className="text-zinc-500 text-[1.05rem] leading-relaxed mb-4">
              Mirador del Ñuble está ubicado a <strong className="text-zinc-700">3 minutos del Puente El Ala</strong>, con
              acceso directo y vistas privilegiadas al Río Ñuble. Un entorno natural único a pocos minutos de la ciudad.
            </p>
            <p className="text-zinc-500 leading-relaxed mb-10">
              Proyecto en verde con entrega para el 2° semestre de 2027. Subdivisión aprobada SAG con
              roles individuales inscritos en el Conservador de Bienes Raíces de Chillán.
            </p>

            <ul className="space-y-3.5">
              {features.map((item, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <IconCheck className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" />
                  <span className="text-zinc-600 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 inline-flex items-center gap-2.5 bg-brand-50 border border-brand-100 px-4 py-2.5 rounded-sm">
              <div className="w-2 h-2 rounded-full bg-brand-600 animate-pulse shrink-0" />
              <span className="text-brand-700 text-[11px] font-semibold tracking-[0.2em] uppercase">
                Preventa en Verde · Cupos Limitados · Entrega 2027
              </span>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <img src={projectImg} alt="Terreno con vista al Río Ñuble"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>

            <div className="absolute -bottom-5 -left-4 lg:-left-6 bg-brand-800 text-white px-6 py-5 rounded-sm shadow-2xl">
              <div className="text-4xl font-bold leading-none">20</div>
              <div className="text-brand-300 text-[10px] font-semibold tracking-[0.22em] uppercase mt-1">Parcelas Totales</div>
              <div className="text-brand-200/70 text-xs mt-0.5">5.000 – 12.000 m²</div>
            </div>

            <div className="absolute -top-4 -right-4 lg:-right-5 bg-white shadow-xl px-4 py-3.5 rounded-sm flex items-center gap-3">
              <IconMapPin className="w-5 h-5 text-brand-600 shrink-0" />
              <div>
                <div className="text-[13px] font-bold text-zinc-900 leading-tight">3 min · Puente El Ala</div>
                <div className="text-xs text-zinc-400">Región del Ñuble, Chile</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// MASTER PLAN — Loteo interactivo
// ─────────────────────────────────────────────────────────────

function MasterPlanSection() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const counts = {
    all:       LOTS.length,
    available: LOTS.filter(l => l.status === 'available').length,
    reserved:  LOTS.filter(l => l.status === 'reserved').length,
    sold:      LOTS.filter(l => l.status === 'sold').length,
  }
  const visible = filter === 'all' ? LOTS : LOTS.filter(l => l.status === filter)

  const tabs = [
    { key: 'all',       label: `Todas (${counts.all})`             },
    { key: 'available', label: `Disponibles (${counts.available})` },
    { key: 'reserved',  label: `Reservadas (${counts.reserved})`   },
    { key: 'sold',      label: `Vendidas (${counts.sold})`         },
  ]

  return (
    <section id="loteo" className="bg-brand-950 py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div>
            <Label text="Disponibilidad · Master Plan" light />
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Elige tu parcela ideal<br />
              <span className="text-brand-400">en tiempo real</span>
            </h2>
            <p className="text-brand-300/60 text-sm leading-relaxed mt-4 max-w-xs">
              Selecciona una parcela para ver su detalle. Haz click para cotizar o reservar.
            </p>
          </div>
          <div className="flex gap-8 shrink-0">
            {[
              { s: 'available', color: 'text-brand-400' },
              { s: 'reserved',  color: 'text-amber-400' },
              { s: 'sold',      color: 'text-zinc-500'  },
            ].map(({ s, color }) => (
              <div key={s} className="text-center">
                <div className="text-3xl font-bold text-white tabular-nums">{counts[s]}</div>
                <div className={`text-[11px] font-semibold tracking-widest uppercase mt-0.5 ${color}`}>
                  {STATUS_CFG[s].label}s
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          {tabs.map(t => (
            <button key={t.key} onClick={() => { setFilter(t.key); setSelected(null) }}
              className={`text-xs font-semibold px-4 py-2 rounded-sm tracking-wide transition-all ${filter === t.key ? 'bg-brand-600 text-white' : 'bg-brand-900 text-brand-300/60 hover:bg-brand-800 hover:text-white'}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {visible.map(lot => {
            const cfg = STATUS_CFG[lot.status]
            const isSel = selected?.id === lot.id
            const clickable = lot.status !== 'sold'
            return (
              <button key={lot.id}
                onClick={() => clickable && setSelected(isSel ? null : lot)}
                disabled={!clickable}
                className={`relative p-4 border rounded-sm text-left transition-all duration-200 ${
                  isSel
                    ? `${cfg.bgSel} ${cfg.borderSel} border-2 scale-[1.02] shadow-lg`
                    : lot.status === 'sold'
                      ? 'bg-brand-950 border-brand-900/50 opacity-30 cursor-not-allowed'
                      : 'bg-brand-900/40 border-brand-900 hover:border-brand-500/60 hover:bg-brand-900 cursor-pointer'
                }`}>
                {lot.featured && !isSel && (
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                )}
                <div className={`font-bold text-base mb-1 ${isSel ? cfg.textSel : 'text-white'}`}>{lot.label}</div>
                <div className={`text-xs mb-2.5 ${isSel ? cfg.textSubSel : 'text-zinc-500'}`}>{lot.size}</div>
                <div className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-[3px] rounded-full ${cfg.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
                  {cfg.label}
                </div>
              </button>
            )
          })}
        </div>

        {selected && (
          <div className="mt-5 bg-brand-900 border border-brand-500/25 rounded-sm p-6 lg:p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { key: 'Lote',       val: selected.label,  accent: false },
                { key: 'Superficie', val: selected.size,   accent: false },
                { key: 'Precio',     val: selected.price,  accent: true  },
                { key: 'Vista',      val: selected.view,   accent: false },
              ].map(({ key, val, accent }) => (
                <div key={key}>
                  <div className="text-brand-300/40 text-[10px] tracking-[0.22em] uppercase mb-1.5">{key}</div>
                  <div className={`font-bold text-xl ${accent ? 'text-brand-400' : 'text-white'}`}>{val}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-brand-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-brand-300/60 text-sm">
                ¿Te interesa <strong className="text-white">{selected.label}</strong>? Contáctanos para agendar una visita o reservar.
              </p>
              <a href="#contacto"
                className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-semibold px-6 py-3 rounded-sm hover:bg-brand-700 transition-colors whitespace-nowrap shrink-0">
                Cotizar {selected.label}
                <IconArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-5 mt-8 justify-end">
          {Object.entries(STATUS_CFG).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-sm ${cfg.dot}`} />
              <span className="text-brand-300/50 text-xs">{cfg.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// VENTAJAS
// ─────────────────────────────────────────────────────────────

function VentajasSection() {
  return (
    <section id="ventajas" className="bg-brand-50 py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <Label text="Lo que incluye tu parcela" />
            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight">
              Diseñado para vivir<br />
              <span className="text-brand-600">y para invertir bien</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs lg:text-right">
            Cada parcela incluye escrituración garantizada, servicios básicos y acceso asfaltado desde el primer día.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VENTAJAS.map((v, i) => (
            <div key={i} className="bg-white rounded-sm p-6 lg:p-8 flex gap-5 group hover:shadow-md transition-shadow border border-zinc-100">
              <div className="text-3xl shrink-0 mt-0.5">{v.ico}</div>
              <div className="flex-1">
                <div className="font-bold text-zinc-900 text-[15px] mb-1.5">{v.title}</div>
                <div className="text-zinc-500 text-sm leading-relaxed">{v.desc}</div>
              </div>
              <div className="text-brand-600 font-black text-lg shrink-0 self-start ml-2">{v.val}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// UBICACIÓN — Google Maps
// ─────────────────────────────────────────────────────────────

function UbicacionSection() {
  const LAT = '-36.578819'
  const LNG = '-72.256633'
  const mapSrc = `https://maps.google.com/maps?q=${LAT},${LNG}&t=k&z=15&ie=UTF8&iwloc=&output=embed`
  const mapsUrl = `https://maps.google.com/?q=${LAT},${LNG}`

  return (
    <section id="ubicacion" className="bg-white py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">

          {/* Info */}
          <div>
            <Label text="Ubicación" />
            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-5">
              A minutos de todo,<br />
              <span className="text-brand-600">en plena naturaleza</span>
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-8">
              Acceso por camino completamente asfaltado hasta la entrada del proyecto.
              Coordenadas exactas para llegar sin complicaciones.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {MAP_TAGS.map(tag => (
                <span key={tag}
                  className="bg-brand-50 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full border border-brand-100">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mb-6 font-mono text-xs text-zinc-400 bg-zinc-50 border border-zinc-100 px-4 py-3 rounded-sm">
              📌 {LAT}° S &nbsp;·&nbsp; {LNG}° W &nbsp;·&nbsp; Región del Ñuble, Chile
            </div>

            <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-brand-600 text-white text-sm font-semibold px-6 py-3.5 rounded-sm hover:bg-brand-700 transition-colors">
              <IconMapPin className="w-4 h-4" />
              Abrir en Google Maps
              <IconExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Map */}
          <div className="relative">
            {/* Subtle brand overlay at bottom of map */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/30 to-transparent z-10 pointer-events-none rounded-b-sm" />

            <div className="relative overflow-hidden rounded-sm shadow-2xl ring-1 ring-brand-100">
              <iframe
                src={mapSrc}
                width="100%"
                height="520"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Mirador del Ñuble — Región del Ñuble"
              />
            </div>

            {/* Location pin card */}
            <div className="absolute -bottom-4 left-6 bg-brand-800 text-white pl-4 pr-6 py-3 rounded-sm shadow-xl flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-600 rounded-sm flex items-center justify-center shrink-0">
                <IconMapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-tight">Mirador del Ñuble</div>
                <div className="text-brand-300 text-[11px]">Vista satélite · 15 min de Chillán</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// GALERÍA — bento grid + Cloudinary optimized
// ─────────────────────────────────────────────────────────────

function GallerySection() {
  return (
    <section id="galeria" className="bg-zinc-950 py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <Label text="Galería · El Entorno" light />
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              El entorno natural<br />
              <span className="text-brand-400">que te espera</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs lg:text-right">
            Naturaleza nativa, lomajes suaves y el Río Ñuble como fondo permanente del proyecto.
          </p>
        </div>

        <div className="grid gap-3 lg:gap-4"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '260px 260px' }}>
          {GALLERY.map(img => (
            <div key={img.id} className={`overflow-hidden rounded-sm group ${img.cls}`}>
              <img src={img.src} alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <p className="text-zinc-600 text-[11px] tracking-[0.22em] uppercase text-center mt-7">
          Imágenes del entorno · Optimizadas vía Cloudinary · Región del Ñuble, Chile
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// CONTACTO
// ─────────────────────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({ name: '', lastname: '', email: '', phone: '', interest: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const inputCls = 'w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 text-sm py-3 focus:outline-none focus:border-brand-400 transition-colors'

  return (
    <section id="contacto" className="bg-brand-800 py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">

          <div>
            <Label text="Contacto" light />
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              ¿Listo para dar<br />
              <span className="text-brand-400">el primer paso?</span>
            </h2>
            <p className="text-brand-200/75 leading-relaxed mb-12">
              Un asesor te contactará a la brevedad con toda la información, precios actualizados
              y disponibilidad de parcelas en Mirador del Ñuble.
            </p>

            <div className="space-y-6">
              {[
                { Icon: IconPhone, label: 'Teléfono',   val: '+56 9 4567 8901',             href: 'tel:+56945678901' },
                { Icon: IconMail,  label: 'Email',      val: 'ventas@propertymaps.cl',        href: 'mailto:ventas@propertymaps.cl' },
                { Icon: IconMapPin, label: 'Proyecto',  val: '15 min de Chillán · Ñuble',   href: null },
              ].map(({ Icon, label, val, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-brand-700 flex items-center justify-center shrink-0">
                    <Icon className="w-[18px] h-[18px] text-brand-400" />
                  </div>
                  <div>
                    <div className="text-zinc-400 text-[10px] tracking-[0.22em] uppercase mb-0.5">{label}</div>
                    {href
                      ? <a href={href} className="text-white font-semibold text-sm hover:text-brand-400 transition-colors">{val}</a>
                      : <span className="text-white font-semibold text-sm">{val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-5">
                <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center">
                  <IconCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">¡Solicitud Enviada!</h3>
                <p className="text-brand-200/75 max-w-sm text-sm leading-relaxed">
                  Un asesor de Property Maps se pondrá en contacto contigo dentro de las próximas 24 horas hábiles con información detallada sobre Mirador del Ñuble.
                </p>
                <button onClick={() => setSubmitted(false)}
                  className="mt-2 text-brand-400 text-sm font-medium hover:text-brand-300 transition-colors">
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="space-y-8" noValidate>
                <div className="grid sm:grid-cols-2 gap-8">
                  <input type="text"  placeholder="Nombre"   required value={form.name}     onChange={set('name')}     className={inputCls} />
                  <input type="text"  placeholder="Apellido"          value={form.lastname} onChange={set('lastname')} className={inputCls} />
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  <input type="email" placeholder="Correo electrónico" required value={form.email} onChange={set('email')} className={inputCls} />
                  <input type="tel"   placeholder="Teléfono / WhatsApp"          value={form.phone} onChange={set('phone')} className={inputCls} />
                </div>
                <select value={form.interest} onChange={set('interest')}
                  className={`${inputCls} appearance-none cursor-pointer`} style={{ background: 'transparent' }}>
                  <option value=""                      style={{ background: '#166534' }}>Parcela de interés…</option>
                  <option value="rio"                   style={{ background: '#166534' }}>Parcela Río – desde $14.900.000</option>
                  <option value="bosque"                style={{ background: '#166534' }}>Parcela Bosque – Consultar precio</option>
                  <option value="grande"                style={{ background: '#166534' }}>Parcela Grande – Consultar precio</option>
                  <option value="asesoria"              style={{ background: '#166534' }}>No sé aún, quiero asesoría</option>
                </select>
                <textarea placeholder="Mensaje o consulta (opcional)" rows={3}
                  value={form.message} onChange={set('message')} className={`${inputCls} resize-none`} />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-white/25 text-xs">Datos confidenciales. Sin spam.</p>
                  <button type="submit"
                    className="inline-flex items-center gap-2.5 bg-brand-400 text-brand-950 text-sm font-bold px-8 py-4 rounded-sm hover:bg-brand-300 transition-colors tracking-wide shrink-0">
                    Enviar solicitud
                    <IconArrowRight className="w-4 h-4" />
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
    Proyecto: ['El Proyecto', 'Parcelas disponibles', 'Master Plan', 'Galería', 'Ubicación'],
    Empresa:  ['Sobre Property Maps', 'Proyectos en Desarrollo', 'Prensa', 'Trabaja con Nosotros'],
    Legal:    ['Política de Privacidad', 'Términos de Uso', 'Normativa SAG', 'Escrituración'],
  }

  return (
    <footer className="bg-brand-950 border-t border-brand-900/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1fr] gap-10 lg:gap-12">

          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-brand-600 rounded-sm flex items-center justify-center shrink-0">
                <span className="text-white text-[11px] font-bold tracking-widest">PM</span>
              </div>
              <span className="text-white text-[13px] font-semibold tracking-[0.22em] uppercase">Property Maps</span>
            </div>
            <p className="text-brand-300/50 text-sm leading-relaxed mb-2 max-w-[230px]">
              Corretaje y gestión de subdivisiones agrícolas premium en las Regiones del Ñuble y Biobío, Chile.
            </p>
            <p className="text-brand-400/40 text-xs mb-6">Proyecto Mirador del Ñuble · A orillas del Río Ñuble</p>
            <div className="flex gap-2.5">
              {[IconInstagram, IconLinkedIn].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 bg-brand-900 border border-brand-800/50 rounded-sm flex items-center justify-center text-brand-400/50 hover:text-brand-400 hover:border-brand-500/60 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(cols).map(([cat, items]) => (
            <div key={cat}>
              <h4 className="text-white text-[11px] font-semibold tracking-[0.22em] uppercase mb-5">{cat}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-brand-300/50 text-sm hover:text-brand-300 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-brand-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-300/30 text-xs">
            © {year} Property Maps SpA. Todos los derechos reservados. RUT: 77.000.000-0
          </p>
          <div className="flex items-center gap-5 flex-wrap justify-center sm:justify-end">
            <span className="text-brand-300/20 text-xs">Precios referenciales · Proyecto sujeto a disponibilidad</span>
            <a href="#" className="text-brand-300/30 text-xs hover:text-brand-300/60 transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <ProximitySection />
        <ProjectSection />
        <MasterPlanSection />
        <VentajasSection />
        <UbicacionSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
