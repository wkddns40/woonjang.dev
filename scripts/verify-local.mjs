#!/usr/bin/env node
import { spawn, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'

const portArg = process.argv.find((arg) => arg === '-p' || arg === '--port')
const port = Number(portArg ? process.argv[process.argv.indexOf(portArg) + 1] : 3200)
const baseUrl = `http://localhost:${port}`

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    ...options,
  })
  if (result.error) {
    console.error(`verify-local: failed to run ${command}: ${result.error.message}`)
    process.exit(1)
  }
  if (result.status !== 0) process.exit(result.status ?? 1)
}

function resolveNpmCli() {
  const candidates = [
    process.env.npm_execpath,
    path.join(path.dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js'),
  ].filter(Boolean)

  return candidates.find((candidate) => existsSync(candidate))
}

function runNpm(args) {
  const npmCli = resolveNpmCli()
  if (npmCli) {
    run(process.execPath, [npmCli, ...args])
    return
  }

  run('npm', args, { shell: process.platform === 'win32' })
}

async function waitForServer(url) {
  const deadline = Date.now() + 15_000
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { method: 'HEAD' })
      if (res.ok) return
    } catch {
      // Retry until the static server is ready.
    }
    await new Promise((resolve) => setTimeout(resolve, 250))
  }
  throw new Error(`Timed out waiting for ${url}`)
}

runNpm(['run', 'build'])

const server = spawn(process.execPath, ['scripts/serve-static-out.mjs', '--port', String(port)], {
  stdio: ['ignore', 'inherit', 'inherit'],
})

try {
  await waitForServer(baseUrl)
  run(process.execPath, ['scripts/verify-deploy.mjs', baseUrl], { shell: false })
} finally {
  server.kill()
}
