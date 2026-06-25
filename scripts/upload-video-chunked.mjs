/**
 * Cloudinary chunked upload para video grande (>100MB)
 * Usa la API de large file upload con chunks de 20MB
 */
import { open } from 'fs/promises'
import { statSync } from 'fs'
import { createHash } from 'crypto'
import { randomUUID } from 'crypto'

const CLOUD = 'dysqraxnh', API_KEY = '795521398221185', API_SECRET = 'QlccTNClTZdIH8u8vKS6tQr8ebE'
const CHUNK = 20 * 1024 * 1024  // 20 MB por chunk

function sign(p) {
  const s = Object.keys(p).sort().map(k=>`${k}=${p[k]}`).join('&') + API_SECRET
  return createHash('sha1').update(s).digest('hex')
}

async function uploadChunked(filePath, publicId, folder='mirador-nuble') {
  const fh = await open(filePath, 'r')
  const { size } = statSync(filePath)
  const uploadId = randomUUID()
  const ts = Math.floor(Date.now()/1000)
  const sig = sign({ folder, public_id: publicId, timestamp: ts })

  console.log(`📦 Archivo: ${(size/1024/1024).toFixed(1)} MB`)
  console.log(`🔑 Upload ID: ${uploadId}`)

  let offset = 0, chunk = 0
  const total = Math.ceil(size / CHUNK)

  while (offset < size) {
    const end = Math.min(offset + CHUNK - 1, size - 1)
    const chunkSize = end - offset + 1
    const buf = Buffer.allocUnsafe(chunkSize)
    await fh.read(buf, 0, chunkSize, offset)

    const blob = new Blob([buf], { type: 'video/mp4' })
    const fd = new FormData()
    fd.append('file', blob, 'video-hero.mp4')
    fd.append('api_key', API_KEY)
    fd.append('timestamp', String(ts))
    fd.append('signature', sig)
    fd.append('folder', folder)
    fd.append('public_id', publicId)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/video/upload`, {
      method: 'POST',
      headers: {
        'X-Unique-Upload-Id': uploadId,
        'Content-Range': `bytes ${offset}-${end}/${size}`,
      },
      body: fd,
    })

    const text = await res.text()
    chunk++
    process.stdout.write(`  Chunk ${chunk}/${total} (${(end/1024/1024).toFixed(0)}MB)... `)

    if (res.status === 200 || res.status === 201) {
      const json = JSON.parse(text)
      if (json.secure_url) {
        console.log('\n✅ ¡Video subido!')
        console.log('URL:', json.secure_url)
        console.log('URL web H264:', `https://res.cloudinary.com/${CLOUD}/video/upload/vc_h264,q_auto:low,w_1280,fps_24/${folder}/${publicId}.mp4`)
        await fh.close(); return json.secure_url
      }
      console.log('ok')
    } else if (res.status === 206) {
      console.log('ok (parcial)')
    } else {
      console.log(`❌ Error HTTP ${res.status}: ${text.substring(0, 200)}`)
      await fh.close(); process.exit(1)
    }

    offset = end + 1
  }

  await fh.close()
}

await uploadChunked('Mirador del ñuble/mirador Ñuble video.MP4', 'video-hero')
