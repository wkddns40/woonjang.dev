import { execSync } from 'node:child_process'

function resolveBuildId() {
  if (process.env.NEXT_BUILD_ID) return process.env.NEXT_BUILD_ID

  try {
    return execSync('git rev-parse --short=12 HEAD', { encoding: 'utf8' }).trim()
  } catch {
    return 'static-export'
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx'],
  reactStrictMode: true,
  generateBuildId: async () => resolveBuildId(),
}

export default nextConfig
