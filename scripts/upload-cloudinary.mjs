/**
 * Script de subida a Cloudinary — Mirador del Ñuble
 * Uso: node scripts/upload-cloudinary.mjs
 */
import { readFileSync } from 'fs'
import { createHash } from 'crypto'

const CLOUD      = 'dysqraxnh'
const API_KEY    = '795521398221185'
const API_SECRET = 'QlccTNClTZdIH8u8vKS6tQr8ebE'
const FOLDER     = 'mirador-nuble'

function sign(params) {
  const str = Object.keys(params).sort()
    .map(k => `${k}=${params[k]}`)
    .join('&') + API_SECRET
  return createHash('sha1').update(str).digest('hex')
}

async function upload(filePath, publicId, resourceType = 'image') {
  const timestamp = Math.floor(Date.now() / 1000)
  const params    = { folder: FOLDER, public_id: publicId, timestamp }
  const signature = sign(params)

  const buf  = readFileSync(filePath)
  const ext  = filePath.split('.').pop().toLowerCase()
  const mime = ext === 'png' ? 'image/png' : ext === 'mp4' ? 'video/mp4' : 'image/jpeg'
  const blob = new Blob([buf], { type: mime })

  const fd = new FormData()
  fd.append('file',       blob,           filePath.split(/[\\/]/).pop())
  fd.append('api_key',    API_KEY)
  fd.append('timestamp',  String(timestamp))
  fd.append('signature',  signature)
  fd.append('folder',     FOLDER)
  fd.append('public_id',  publicId)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD}/${resourceType}/upload`,
    { method: 'POST', body: fd }
  )
  const json = await res.json()
  if (json.error) throw new Error(json.error.message)
  return json.secure_url
}

const BASE = 'Mirador del ñuble'

const FILES = [
  // ── Fotos de terreno ────────────────────────────────────────
  [`${BASE}/fotos/hero-terreno-vista-rio.jpg`,   'hero-terreno-vista-rio'],
  [`${BASE}/fotos/terreno-camino-rio-nuble.jpg`, 'terreno-camino-rio-nuble'],
  [`${BASE}/fotos/rio-nuble-meandros-1.jpg`,     'rio-nuble-meandros-1'],
  [`${BASE}/fotos/rio-nuble-meandros-2.jpg`,     'rio-nuble-meandros-2'],
  [`${BASE}/fotos/bosque-con-rio-al-fondo.jpg`,  'bosque-con-rio-al-fondo'],
  [`${BASE}/fotos/bosque-proyecto-extension.jpg`,'bosque-proyecto-extension'],
  [`${BASE}/fotos/camino-interior-bosque.jpg`,   'camino-interior-bosque'],
  [`${BASE}/fotos/camino-interior-montanas.jpg`, 'camino-interior-montanas'],
  [`${BASE}/fotos/vista-aerea-bosque-lago.jpg`,  'vista-aerea-bosque-lago'],
  // ── Fotos de dron ───────────────────────────────────────────
  [`${BASE}/audiofilms2_fotos-dron-proyecto-cygnus_2026-05-13_0237/DJI_0181.JPG`, 'dji-0181'],
  [`${BASE}/audiofilms2_fotos-dron-proyecto-cygnus_2026-05-13_0237/DJI_0182.JPG`, 'dji-0182'],
  [`${BASE}/audiofilms2_fotos-dron-proyecto-cygnus_2026-05-13_0237/DJI_0183.JPG`, 'dji-0183'],
  [`${BASE}/audiofilms2_fotos-dron-proyecto-cygnus_2026-05-13_0237/DJI_0186.JPG`, 'dji-0186'],
  [`${BASE}/audiofilms2_fotos-dron-proyecto-cygnus_2026-05-13_0237/DJI_0187.JPG`, 'dji-0187'],
  [`${BASE}/audiofilms2_fotos-dron-proyecto-cygnus_2026-05-13_0237/DJI_0194.JPG`, 'dji-0194'],
  [`${BASE}/audiofilms2_fotos-dron-proyecto-cygnus_2026-05-13_0237/DJI_0195.JPG`, 'dji-0195'],
  [`${BASE}/audiofilms2_fotos-dron-proyecto-cygnus_2026-05-13_0237/DJI_0206.JPG`, 'dji-0206'],
  [`${BASE}/audiofilms2_fotos-dron-proyecto-cygnus_2026-05-13_0237/DJI_0207.JPG`, 'dji-0207'],
  // ── Logos / Branding ────────────────────────────────────────
  [`${BASE}/logo mirador blanco sin fondo@3x.png`, 'logo-mirador-blanco'],
  [`${BASE}/logo mirador verde oscuro@3x.png`,     'logo-mirador-verde'],
  [`${BASE}/Fav.png`,                              'fav-mirador'],
]

const results = {}
let ok = 0, fail = 0

for (const [path, id] of FILES) {
  try {
    const url = await upload(path, id)
    results[id] = url
    console.log(`✅  ${id}`)
    ok++
  } catch (e) {
    console.error(`❌  ${id}: ${e.message}`)
    fail++
  }
}

console.log(`\n──────────────────────────────────────────`)
console.log(`✅ ${ok} subidas   ❌ ${fail} errores`)
console.log(`\n// Pega esto en App.jsx:\nconst CLD_URLS = ${JSON.stringify(results, null, 2)}`)
