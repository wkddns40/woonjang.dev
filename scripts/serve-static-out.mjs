#!/usr/bin/env node
import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'

const root = path.join(process.cwd(), 'out')
const portArg = process.argv.find((arg) => arg === '-p' || arg === '--port')
const portValue = portArg ? process.argv[process.argv.indexOf(portArg) + 1] : undefined
const port = Number(portValue ?? process.env.PORT ?? 3200)

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.pdf', 'application/pdf'],
  ['.woff2', 'font/woff2'],
])

const cloudflareControlFiles = new Set(['/_headers', '/_redirects'])

function resolvePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0])
  if (cloudflareControlFiles.has(decoded)) return path.join(root, '404.html')
  if (decoded === '/') return path.join(root, 'index.html')
  if (decoded === '/en') return path.join(root, 'en.html')
  if (decoded === '/en/') return path.join(root, 'en.html')

  const direct = path.join(root, decoded.slice(1))
  if (existsSync(direct) && statSync(direct).isFile()) return direct

  const html = `${direct}.html`
  if (existsSync(html) && statSync(html).isFile()) return html

  const index = path.join(direct, 'index.html')
  if (existsSync(index) && statSync(index).isFile()) return index

  return path.join(root, '404.html')
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath)
  if (ext) return contentTypes.get(ext) ?? 'application/octet-stream'
  if (path.basename(filePath).startsWith('opengraph-image-')) return 'image/png'
  return 'application/octet-stream'
}

function applyHeaders(res, urlPath, filePath) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, User-Agent')
  res.setHeader('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large')
  res.setHeader('Content-Type', contentTypeFor(filePath))

  if (urlPath.startsWith('/_next/static/')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  } else if (['/profile.json', '/robots.txt', '/sitemap.xml'].includes(urlPath)) {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
  }
}

const server = createServer((req, res) => {
  const urlPath = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`).pathname

  if (req.method === 'OPTIONS') {
    applyHeaders(res, urlPath, path.join(root, 'index.html'))
    res.writeHead(204)
    res.end()
    return
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405)
    res.end()
    return
  }

  const filePath = resolvePath(urlPath)
  const is404 = path.basename(filePath) === '404.html' && !['/404', '/404.html'].includes(urlPath)
  applyHeaders(res, urlPath, filePath)
  res.writeHead(is404 ? 404 : 200)
  if (req.method === 'HEAD') {
    res.end()
    return
  }
  createReadStream(filePath).pipe(res)
})

server.listen(port, () => {
  console.log(`serve-static-out: http://localhost:${port}`)
})
