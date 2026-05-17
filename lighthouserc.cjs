const baseUrl = (process.env.BASE_URL ?? 'https://woonjang.dev').replace(/\/+$/, '')

module.exports = {
  ci: {
    collect: {
      url: [`${baseUrl}/`, `${baseUrl}/en`],
      numberOfRuns: 3,
      chromeFlags: '--no-sandbox --disable-dev-shm-usage',
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 1 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3500 }],
        'total-blocking-time': ['error', { maxNumericValue: 350 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.02 }],
        'errors-in-console': 'warn',
        'color-contrast': 'warn',
        'link-in-text-block': 'warn',
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
}
