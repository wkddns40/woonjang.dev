#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

const outDir = path.join(process.cwd(), 'out')

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(fullPath)
    return [fullPath]
  })
}

function relative(file) {
  return path.relative(process.cwd(), file).replaceAll(path.sep, '/')
}

if (!statSync(outDir, { throwIfNoEntry: false })?.isDirectory()) {
  console.error('assert-static-output: missing out/. Run `npm run build` first.')
  process.exit(1)
}

const failures = []
const htmlFiles = walk(outDir).filter((file) => file.endsWith('.html'))

for (const htmlFile of htmlFiles) {
  const html = readFileSync(htmlFile, 'utf8')
  const scriptPreloads = [
    ...html.matchAll(/<link\b(?=[^>]*(?:as=["']script["']|rel=["']modulepreload["']))[^>]*>/gi),
  ]
  const clientScripts = [
    ...html.matchAll(
      /<script\b(?![^>]*type=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi,
    ),
  ]
  const chunkRefs = [...html.matchAll(/_next\/static\/chunks\//g)]
  const routePayload = htmlFile.replace(/\.html$/, '.txt')

  if (scriptPreloads.length > 0) {
    failures.push(`${relative(htmlFile)} has ${scriptPreloads.length} script preload(s).`)
  }
  if (clientScripts.length > 0) {
    failures.push(`${relative(htmlFile)} has ${clientScripts.length} client script tag(s).`)
  }
  if (chunkRefs.length > 0) {
    failures.push(`${relative(htmlFile)} references _next/static/chunks/.`)
  }
  if (existsSync(routePayload)) {
    failures.push(`${relative(routePayload)} static RSC payload still exists.`)
  }
}

const chunksDir = path.join(outDir, '_next/static/chunks')
if (statSync(chunksDir, { throwIfNoEntry: false })?.isDirectory()) {
  failures.push(`${relative(chunksDir)} still exists.`)
}

if (failures.length > 0) {
  console.error(`assert-static-output: ${failures.length} failure(s):`)
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exit(1)
}

console.log(`assert-static-output: ${htmlFiles.length} HTML file(s) have no client JS.`)
