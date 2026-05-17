export const SITE_URL = normalizeSiteUrl('https://woonjang.dev')

function normalizeSiteUrl(url: string): string {
  return url.replace(/\/+$/, '')
}
