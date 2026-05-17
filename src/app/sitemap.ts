import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { LAST_UPDATED } from '@/lib/build-info'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = LAST_UPDATED
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          ko: `${SITE_URL}/`,
          en: `${SITE_URL}/en`,
        },
      },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          ko: `${SITE_URL}/`,
          en: `${SITE_URL}/en`,
        },
      },
    },
  ]
}
