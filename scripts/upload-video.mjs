import { readFileSync } from 'fs'
import { createHash } from 'crypto'

const CLOUD = 'dysqraxnh', API_KEY = '795521398221185', API_SECRET = 'QlccTNClTZdIH8u8vKS6tQr8ebE'

function sign(p) {
  const s = Object.keys(p).sort().map(k=>`${k}=${p[k]}`).join('&') + API_SECRET
  return createHash('sha1').update(s).digest('hex')
}

const path = 'Mirador del ñuble/mirador Ñuble video.MP4'
const ts = Math.floor(Date.now()/1000)
const sig = sign({ folder:'mirador-nuble', public_id:'video-hero', timestamp: ts })

console.log('Cargando video en memoria...')
const buf = readFileSync(path)
const blob = new Blob([buf], { type:'video/mp4' })

const fd = new FormData()
fd.append('file', blob, 'video-hero.mp4')
fd.append('api_key', API_KEY)
fd.append('timestamp', String(ts))
fd.append('signature', sig)
fd.append('folder', 'mirador-nuble')
fd.append('public_id', 'video-hero')
fd.append('resource_type', 'video')

console.log('Subiendo a Cloudinary (puede tomar 1-2 min)...')
const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/video/upload`, { method:'POST', body:fd })
const json = await res.json()

if (json.error) { console.error('❌ Error:', json.error.message); process.exit(1) }
console.log('✅ Video subido:')
console.log('URL base:', json.secure_url)
console.log('URL web (H264 comprimido):', `https://res.cloudinary.com/${CLOUD}/video/upload/vc_h264,q_auto:low,w_1280,fps_24/mirador-nuble/video-hero.mp4`)
