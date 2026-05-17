#!/usr/bin/env node
import {
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(fullPath)
    return fullPath.endsWith('.html') ? [fullPath] : []
  })
}

function walkAll(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walkAll(fullPath)
    return [fullPath]
  })
}

function pruneHtml(file) {
  const original = readFileSync(file, 'utf8')
  let removedScriptPreloads = 0
  let removedScripts = 0

  const withoutScriptPreloads = original.replace(
    /<link\b(?=[^>]*(?:as=["']script["']|rel=["']modulepreload["']))[^>]*>\s*/gi,
    () => {
      removedScriptPreloads += 1
      return ''
    },
  )

  const pruned = withoutScriptPreloads.replace(
    /<script\b(?![^>]*type=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>\s*/gi,
    () => {
      removedScripts += 1
      return ''
    },
  )

  if (pruned !== original) writeFileSync(file, pruned)
  return { removedScriptPreloads, removedScripts }
}

let totalPreloads = 0
let totalScripts = 0
let files = 0
let removedRscPayloads = 0
const targets = [
  path.join(process.cwd(), '.next/server/app'),
  path.join(process.cwd(), 'out'),
]

for (const target of targets) {
  if (!statSync(target, { throwIfNoEntry: false })?.isDirectory()) continue
  for (const file of walk(target)) {
    const result = pruneHtml(file)
    totalPreloads += result.removedScriptPreloads
    totalScripts += result.removedScripts
    files += 1
  }
}

const outDir = path.join(process.cwd(), 'out')
if (statSync(outDir, { throwIfNoEntry: false })?.isDirectory()) {
  for (const htmlFile of walk(outDir)) {
    const routePayload = htmlFile.replace(/\.html$/, '.txt')
    if (!existsSync(routePayload)) continue
    unlinkSync(routePayload)
    removedRscPayloads += 1
  }
}

let removedChunkFiles = 0
let removedChunkBytes = 0
const chunksDir = path.join(outDir, '_next/static/chunks')
if (statSync(chunksDir, { throwIfNoEntry: false })?.isDirectory()) {
  let referenced = false
  for (const htmlFile of walk(outDir)) {
    if (/_next\/static\/chunks\//.test(readFileSync(htmlFile, 'utf8'))) {
      referenced = true
      break
    }
  }
  if (referenced) {
    console.warn(
      'prune-static-client-js: chunks/ retained — HTML still references _next/static/chunks/.',
    )
  } else {
    for (const file of walkAll(chunksDir)) {
      removedChunkBytes += statSync(file).size
      removedChunkFiles += 1
    }
    rmSync(chunksDir, { recursive: true, force: true })
  }
}

console.log(
  `prune-static-client-js: processed ${files} HTML file(s), removed ${totalPreloads} script preload(s), ${totalScripts} client script tag(s), ${removedRscPayloads} static RSC payload file(s), and ${removedChunkFiles} unreferenced JS chunk file(s) (${(removedChunkBytes / 1024).toFixed(1)} KB).`,
)
