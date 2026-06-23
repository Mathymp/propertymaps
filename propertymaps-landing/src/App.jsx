import { useState, useEffect } from 'react'

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const LOTS = [
  { id: 1,  label: 'L-01', size: '5.000 m²',  price: 'UF 3.200', status: 'sold',      view: 'Lomaje norte',     featured: false },
  { id: 2,  label: 'L-02', size: '5.500 m²',  price: 'UF 3.480', status: 'sold',      view: 'Lomaje norte',     featured: false },
  { id: 3,  label: 'L-03', size: '6.000 m²',  price: 'UF 3.720', status: 'sold',      view: 'Vista cordillera', featured: false },
  { id: 4,  label: 'L-04', size: '7.200 m²',  price: 'UF 4.320', status: 'sold',      view: 'Vista cordillera', featured: false },
  { id: 5,  label: 'L-05', size: '8.000 m²',  price: 'UF 4.800', status: 'reserved',  view: 'Vista 360°',       featured: true  },
  { id: 6,  label: 'L-06', size: '6.800 m²',  price: 'UF 4.080', status: 'available', view: 'Lomaje poniente',  featured: false },
  { id: 7,  label: 'L-07', size: '5.200 m²',  price: 'UF 3.360', status: 'available', view: 'Lomaje poniente',  featured: false },
  { id: 8,  label: 'L-08', size: '5.800 m²',  price: 'UF 3.720', status: 'available', view: 'Vista río',        featured: false },
  { id: 9,  label: 'L-09', size: '7.500 m²',  price: 'UF 4.800', status: 'reserved',  view: 'Vista río',        featured: true  },
  { id: 10, label: 'L-10', size: '9.200 m²',  price: 'UF 5.520', status: 'sold',      view: 'Vista panorámica', featured: false },
  { id: 11, label: 'L-11', size: '6.100 m²',  price: 'UF 3.960', status: 'available', view: 'Lomaje sur',       featured: false },
  { id: 12, label: 'L-12', size: '5.600 m²',  price: 'UF 3.640', status: 'available', view: 'Lomaje sur',       featured: false },
  { id: 13, label: 'L-13', size: '6.400 m²',  price: 'UF 4.160', status: 'reserved',  view: 'Vista bosque',     featured: false },
  { id: 14, label: 'L-14', size: '7.800 m²',  price: 'UF 5.200', status: 'reserved',  view: 'Vista bosque',     featured: true  },
  { id: 15, label: 'L-15', size: '10.500 m²', price: 'UF 7.350', status: 'available', view: 'Vista 360°',       featured: true  },
  { id: 16, label: 'L-16', size: '8.200 m²',  price: 'UF 5.330', status: 'available', view: 'Lomaje oriente',   featured: false },
  { id: 17, label: 'L-17', size: '6.700 m²',  price: 'UF 4.355', status: 'sold',      view: 'Lomaje oriente',   featured: false },
  { id: 18, label: 'L-18', size: '5.900 m²',  price: 'UF 3.835', status: 'available', view: 'Vista valle',      featured: false },
  { id: 19, label: 'L-19', size: '7.100 m²',  price: 'UF 4.615', status: 'reserved',  view: 'Vista valle',      featured: false },
  { id: 20, label: 'L-20', size: '12.000 m²', price: 'UF 8.400', status: 'available', view: 'Esquina premium',  featured: true  },
]

const GALLERY = [
  { id: 1, url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=85', alt: 'Vista aérea de los lomajes del Ñuble',   cls: 'col-span-2 row-span-2' },
  { id: 2, url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=85',  alt: 'Bosque nativo de robles y avellanos',   cls: 'col-span-1 row-span-1' },
  { id: 3, url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85',  alt: 'Cordillera y entorno precordillerano',  cls: 'col-span-1 row-span-1' },
  { id: 4, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85',  alt: 'Río y valle del Ñuble',                cls: 'col-span-1 row-span-2' },
  { id: 5, url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=85',  alt: 'Lomajes verdes al amanecer',           cls: 'col-span-1 row-span-1' },
  { id: 6, url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=85',  alt: 'Vegetación nativa exuberante',         cls: 'col-span-1 row-span-1' },
]

const STATUS_CFG = {
  available: {
    label:       'Disponible',
    dot:         'bg-brand-600',
    badge:       'bg-brand-50 text-brand-700',
    borderSel:   'border-brand-600',
    bgSel:       'bg-brand-50',
    textSel:     'text-brand-800',
    textSubSel:  'text-brand-600',
  },
  reserved: {
    label:       'Reservada',
    dot:         'bg-amber-500',
    badge:       'bg-amber-50 text-amber-700',
    borderSel:   'border-amber-400',
    bgSel:       'bg-amber-50',
    textSel:     'text-amber-900',
    textSubSel:  'text-amber-700',
  },
  sold: {
    label:       'Vendida',
    dot:         'bg-zinc-500',
    badge:       'bg-zinc-800 text-zinc-400',
    borderSel:   'border-zinc-600',
    bgSel:       'bg-zinc-900',
    textSel:     'text-zinc-300',
    textSubSel:  'text-zinc-500',
  },
}

// ─────────────────────────────────────────────────────────────
// SVG ICONS — inline, zero deps
// ─────────────────────────────────────────────────────────────

function IconCheck(p)    { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> }
function IconMapPin(p)   { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg> }
function IconChevronDown(p){ return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg> }
function IconArrowRight(p){ return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg> }
function IconPhone(p)    { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg> }
function IconMail(p)     { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> }
function IconInstagram(p){ return <svg {...p} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> }
function IconLinkedIn(p) { return <svg {...p} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> }

// ─────────────────────────────────────────────────────────────
// SECTION LABEL — reusable
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
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Proyecto', href: '#proyecto' },
    { label: 'Loteo',    href: '#loteo'    },
    { label: 'Galería',  href: '#galeria'  },
    { label: 'Contacto', href: '#contacto' },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between py-5">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className={`w-8 h-8 flex items-center justify-center rounded-sm transition-colors ${
            scrolled ? 'bg-brand-600' : 'bg-white/15 border border-white/25'
          }`}>
            <span className="text-white text-[11px] font-bold tracking-widest">PM</span>
          </div>
          <span className={`text-[13px] font-semibold tracking-[0.22em] uppercase transition-colors ${
            scrolled ? 'text-zinc-900' : 'text-white'
          }`}>Property Maps</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:opacity-60 ${
                scrolled ? 'text-zinc-700' : 'text-white/85'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className={`text-[13px] font-semibold px-5 py-2.5 rounded-sm transition-all ${
              scrolled
                ? 'bg-brand-600 text-white hover:bg-brand-700'
                : 'border border-white/35 text-white hover:bg-white/12'
            }`}
          >
            Agendar Visita
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          className={`md:hidden flex flex-col gap-[5px] p-1 ${scrolled ? 'text-zinc-900' : 'text-white'}`}
        >
          <span className={`block w-6 h-[2px] bg-current transition-all origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-[2px] bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-current transition-all origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-6 pt-4 pb-6 space-y-1">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-3 text-sm font-medium text-zinc-700 border-b border-zinc-50 last:border-0"
            >
              {l.label}
              <IconArrowRight className="w-3.5 h-3.5 text-zinc-300" />
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="block text-center mt-4 py-3.5 bg-brand-600 text-white text-sm font-semibold rounded-sm"
          >
            Agendar Visita
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
  return (
    <section className="relative min-h-svh flex flex-col justify-end overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=90"
          alt="Paisaje aéreo de los lomajes del Ñuble"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950/88 via-zinc-900/30 to-zinc-900/10" />
        <div className="absolute inset-0 bg-linear-to-r from-zinc-950/60 via-zinc-950/15 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-20 lg:pb-28">

        <Label text="Property Maps · Lanzamiento Exclusivo en Verde" light />

        {/* Asymmetric headline */}
        <h1 className="font-extrabold leading-[0.88] tracking-tighter text-white">
          <span className="block text-7xl sm:text-8xl lg:text-[9rem]">Mirador</span>
          <span className="block text-7xl sm:text-8xl lg:text-[9rem] text-brand-400 ml-6 sm:ml-10 lg:ml-24">
            del Ñuble
          </span>
        </h1>

        <p className="mt-7 text-zinc-300 text-base sm:text-lg font-light max-w-lg leading-relaxed">
          Parcelas agrícolas exclusivas en los lomajes naturales de la Región del Ñuble.
          Subdivisión con roles propios y aprobación SAG vigente.
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap gap-3 mt-9">
          <a
            href="#proyecto"
            className="inline-flex items-center gap-2.5 bg-brand-600 text-white text-sm font-semibold px-7 py-4 rounded-sm hover:bg-brand-700 transition-colors tracking-wide"
          >
            Explorar Proyecto
            <IconArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#loteo"
            className="inline-flex items-center gap-2.5 border border-white/30 text-white text-sm font-medium px-7 py-4 rounded-sm hover:bg-white/10 transition-colors tracking-wide"
          >
            Ver Plano de Loteo
          </a>
        </div>

        {/* Floating stat cards */}
        <div className="mt-14 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { value: 'SAG',      label: 'Subdivisión Aprobada', sub: 'Decreto vigente' },
            { value: 'Roles',    label: 'Propios por Parcela',  sub: 'CBR Chillán' },
            { value: 'UF 3.200', label: 'Precio Desde',         sub: '20 parcelas · desde 5.000 m²' },
          ].map((c, i) => (
            <div
              key={i}
              className="bg-white/[0.07] backdrop-blur-md border border-white/[0.11] rounded-sm px-5 py-4"
            >
              <div className="text-2xl font-bold text-white leading-none mb-1.5">{c.value}</div>
              <div className="text-[11px] font-semibold text-brand-300 tracking-[0.2em] uppercase">{c.label}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{c.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-45 pointer-events-none">
        <span className="text-white text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <IconChevronDown className="w-4 h-4 text-white animate-bounce" />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// PROYECTO
// ─────────────────────────────────────────────────────────────

function ProjectSection() {
  const features = [
    'Lomajes suaves con pendiente ideal para construcción residencial',
    'Camino consolidado de acceso con servidumbre de paso inscrita',
    'Electricidad trifásica y agua disponible en el entorno inmediato',
    'Vegetación nativa: robles, avellanos, boldos y canelos',
    'A 35 min de Chillán · 1h 30 min de Concepción por Ruta 5 Sur',
    'Ideales para residencia de campo, inversión o agroproyecto de alta gama',
  ]

  return (
    <section id="proyecto" className="bg-white py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-24 items-center">

          {/* Text */}
          <div className="order-2 lg:order-1">
            <Label text="El Proyecto" />

            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-5">
              Preventa en Verde<br />
              <span className="text-brand-600">Mirador del Ñuble</span>
            </h2>

            <p className="text-zinc-500 text-[1.05rem] leading-relaxed mb-4">
              Un proyecto cuidadosamente planificado en los fértiles lomajes de la precordillera
              del Ñuble. Cada parcela ha sido diseñada para preservar la topografía natural y
              maximizar las vistas al valle y la cordillera andina.
            </p>
            <p className="text-zinc-500 leading-relaxed mb-10">
              La subdivisión cuenta con aprobación SAG vigente, roles individuales inscritos
              en el Conservador de Bienes Raíces de Chillán y escrituración clara. Ideal para
              inversión a largo plazo, segunda residencia o desarrollo de agroproyecto premium.
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
                Preventa en Verde · Cupos Limitados
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=85"
                alt="Lomajes y naturaleza nativa del Ñuble"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>

            {/* Floating card — lot count */}
            <div className="absolute -bottom-5 -left-4 lg:-left-6 bg-brand-800 text-white px-6 py-5 rounded-sm shadow-2xl">
              <div className="text-4xl font-bold leading-none">20</div>
              <div className="text-brand-300 text-[10px] font-semibold tracking-[0.22em] uppercase mt-1">Parcelas Totales</div>
              <div className="text-brand-200/70 text-xs mt-0.5">5.000 – 12.000 m²</div>
            </div>

            {/* Floating card — location */}
            <div className="absolute -top-4 -right-4 lg:-right-5 bg-white shadow-xl px-4 py-3.5 rounded-sm flex items-center gap-3">
              <IconMapPin className="w-5 h-5 text-brand-600 shrink-0" />
              <div>
                <div className="text-[13px] font-bold text-zinc-900 leading-tight">Región del Ñuble</div>
                <div className="text-xs text-zinc-400">Chillán, Chile</div>
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
  const [filter,   setFilter]   = useState('all')
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
    <section id="loteo" className="bg-zinc-950 py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div>
            <Label text="Master Plan" light />
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Plano de Loteo<br />
              <span className="text-brand-400">Interactivo</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mt-4 max-w-xs">
              Selecciona una parcela para ver su detalle. Haz click en una disponible para cotizar o reservar.
            </p>
          </div>

          {/* Counters */}
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

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-7">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => { setFilter(t.key); setSelected(null) }}
              className={`text-xs font-semibold px-4 py-2 rounded-sm tracking-wide transition-all ${
                filter === t.key
                  ? 'bg-brand-600 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Lot grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {visible.map(lot => {
            const cfg        = STATUS_CFG[lot.status]
            const isSelected = selected?.id === lot.id
            const clickable  = lot.status !== 'sold'

            return (
              <button
                key={lot.id}
                onClick={() => clickable && setSelected(isSelected ? null : lot)}
                disabled={!clickable}
                className={`relative p-4 border rounded-sm text-left transition-all duration-200 ${
                  isSelected
                    ? `${cfg.bgSel} ${cfg.borderSel} border-2 scale-[1.02] shadow-lg`
                    : lot.status === 'sold'
                      ? 'bg-zinc-900 border-zinc-800 opacity-40 cursor-not-allowed'
                      : 'bg-zinc-900 border-zinc-800 hover:border-brand-600/50 hover:bg-zinc-800 cursor-pointer'
                }`}
              >
                {lot.featured && !isSelected && (
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                )}
                <div className={`font-bold text-base mb-1 ${isSelected ? cfg.textSel : 'text-white'}`}>
                  {lot.label}
                </div>
                <div className={`text-xs mb-2.5 ${isSelected ? cfg.textSubSel : 'text-zinc-500'}`}>
                  {lot.size}
                </div>
                <div className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-[3px] rounded-full ${cfg.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
                  {cfg.label}
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected lot panel */}
        {selected && (
          <div className="mt-5 bg-zinc-900 border border-brand-600/20 rounded-sm p-6 lg:p-8 animate-in fade-in duration-200">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { key: 'Lote',       val: selected.label,  accent: false },
                { key: 'Superficie', val: selected.size,   accent: false },
                { key: 'Precio',     val: selected.price,  accent: true  },
                { key: 'Vista',      val: selected.view,   accent: false },
              ].map(({ key, val, accent }) => (
                <div key={key}>
                  <div className="text-zinc-500 text-[10px] tracking-[0.22em] uppercase mb-1.5">{key}</div>
                  <div className={`font-bold text-xl ${accent ? 'text-brand-400' : 'text-white'}`}>{val}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-zinc-400 text-sm">
                ¿Te interesa <strong className="text-white font-semibold">{selected.label}</strong>?
                Contáctanos para agendar visita o reservar.
              </p>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-semibold px-6 py-3 rounded-sm hover:bg-brand-700 transition-colors whitespace-nowrap shrink-0"
              >
                Consultar {selected.label}
                <IconArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-5 mt-8 justify-end">
          {Object.entries(STATUS_CFG).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-sm ${cfg.dot}`} />
              <span className="text-zinc-500 text-xs">{cfg.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// GALERÍA — bento grid
// ─────────────────────────────────────────────────────────────

function GallerySection() {
  return (
    <section id="galeria" className="bg-brand-50 py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <Label text="Galería" />
            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight">
              El Entorno Natural<br />
              <span className="text-brand-600">del Proyecto</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs lg:text-right">
            Naturaleza nativa, lomajes suaves y paisajes que definen el carácter único de Mirador del Ñuble.
          </p>
        </div>

        {/* Bento grid */}
        <div
          className="grid gap-3 lg:gap-4"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: '260px 260px',
          }}
        >
          {GALLERY.map(img => (
            <div key={img.id} className={`overflow-hidden rounded-sm group ${img.cls}`}>
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <p className="text-zinc-400 text-[11px] tracking-[0.22em] uppercase text-center mt-7">
          Imágenes referenciales del entorno · Región del Ñuble, Chile
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// CONTACTO — formulario premium
// ─────────────────────────────────────────────────────────────

function ContactSection() {
  const [form,      setForm]      = useState({ name: '', email: '', phone: '', interest: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const inputCls =
    'w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 ' +
    'text-sm py-3 focus:outline-none focus:border-brand-400 transition-colors'

  const contacts = [
    { Icon: IconPhone,  label: 'Teléfono',  val: '+56 9 4567 8901',       href: 'tel:+56945678901'                    },
    { Icon: IconMail,   label: 'Email',     val: 'ventas@propertymaps.cl', href: 'mailto:ventas@propertymaps.cl'       },
    { Icon: IconMapPin, label: 'Ubicación', val: 'Región del Ñuble · Chillán', href: null                             },
  ]

  return (
    <section id="contacto" className="bg-brand-800 py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">

          {/* Left: info */}
          <div>
            <Label text="Contacto" light />
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Agenda tu<br />
              <span className="text-brand-400">Visita al Proyecto</span>
            </h2>
            <p className="text-brand-200/75 leading-relaxed text-[1rem] mb-12">
              Nuestros asesores te guiarán personalmente por los terrenos disponibles.
              Conoce el proyecto, sus características y las opciones de financiamiento a medida.
            </p>

            <div className="space-y-6">
              {contacts.map(({ Icon, label, val, href }) => (
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

          {/* Right: form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-5">
                <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center">
                  <IconCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">¡Mensaje Recibido!</h3>
                <p className="text-brand-200/75 max-w-sm text-sm leading-relaxed">
                  Un asesor de Property Maps se pondrá en contacto contigo dentro de las próximas 24 horas hábiles.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-brand-400 text-sm font-medium hover:text-brand-300 transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
                className="space-y-8"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-8">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    required
                    value={form.name}
                    onChange={set('name')}
                    className={inputCls}
                  />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    required
                    value={form.email}
                    onChange={set('email')}
                    className={inputCls}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  <input
                    type="tel"
                    placeholder="Teléfono / WhatsApp"
                    value={form.phone}
                    onChange={set('phone')}
                    className={inputCls}
                  />
                  <select
                    value={form.interest}
                    onChange={set('interest')}
                    className={`${inputCls} appearance-none cursor-pointer`}
                    style={{ background: 'transparent' }}
                  >
                    <option value=""             style={{ background: '#1b3325' }}>Interés en…</option>
                    <option value="visita"       style={{ background: '#1b3325' }}>Agendar visita presencial</option>
                    <option value="brochure"     style={{ background: '#1b3325' }}>Recibir brochure digital</option>
                    <option value="reserva"      style={{ background: '#1b3325' }}>Reservar una parcela</option>
                    <option value="financiamiento" style={{ background: '#1b3325' }}>Consulta de financiamiento</option>
                  </select>
                </div>
                <textarea
                  placeholder="Mensaje o consulta (opcional)"
                  rows={3}
                  value={form.message}
                  onChange={set('message')}
                  className={`${inputCls} resize-none`}
                />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-white/25 text-xs">
                    Tus datos son confidenciales y no serán compartidos.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2.5 bg-white text-brand-800 text-sm font-bold px-8 py-4 rounded-sm hover:bg-brand-50 transition-colors tracking-wide shrink-0"
                  >
                    Enviar Consulta
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
    Proyecto: ['Mirador del Ñuble', 'Master Plan', 'Galería del Entorno', 'Contacto y Visitas'],
    Empresa:  ['Sobre Property Maps', 'Proyectos en Desarrollo', 'Prensa y Medios', 'Trabaja con Nosotros'],
    Legal:    ['Política de Privacidad', 'Términos de Uso', 'Normativa SAG', 'Proceso de Escrituración'],
  }

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">

        <div className="grid grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1fr] gap-10 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-brand-600 rounded-sm flex items-center justify-center shrink-0">
                <span className="text-white text-[11px] font-bold tracking-widest">PM</span>
              </div>
              <span className="text-white text-[13px] font-semibold tracking-[0.22em] uppercase">Property Maps</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-[230px]">
              Corretaje y gestión de subdivisiones agrícolas premium en las regiones del Ñuble y Biobío, Chile.
            </p>
            <div className="flex gap-2.5">
              {[IconInstagram, IconLinkedIn].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center text-zinc-500 hover:text-brand-400 hover:border-brand-600/50 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([cat, items]) => (
            <div key={cat}>
              <h4 className="text-white text-[11px] font-semibold tracking-[0.22em] uppercase mb-5">{cat}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs">
            © {year} Property Maps SpA. Todos los derechos reservados. RUT: 77.000.000-0
          </p>
          <div className="flex items-center gap-5 flex-wrap justify-center sm:justify-end">
            <span className="text-zinc-700 text-xs">Reg. Corredor: MINVU Nº 00000</span>
            <a href="#" className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors">
              Términos de Uso
            </a>
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
        <ProjectSection />
        <MasterPlanSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
