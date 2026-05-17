#!/usr/bin/env node
import { readFileSync, statSync } from 'node:fs'

const pdfs = ['public/resume/woon_jang.pdf', 'public/resume/woon_jang_en.pdf']
let failures = 0

for (const file of pdfs) {
  const head = readFileSync(file).subarray(0, 5).toString('latin1')
  const sizeKb = statSync(file).size / 1024
  const ok = head === '%PDF-'
  if (!ok) failures += 1
  console.log(
    `${ok ? 'OK' : 'XX'} ${file} ${sizeKb.toFixed(1)} KB ${ok ? '' : `(magic=${head})`}`.trim(),
  )
}

if (failures > 0) process.exit(1)
