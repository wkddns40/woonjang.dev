import { SITE_URL } from './site'

export const PERSON_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Woon',
  url: SITE_URL,
  email: 'mailto:dj4ngb0g0h@gmail.com',
  jobTitle: 'Aspiring Manufacturing AI Data Systems Engineer',
  sameAs: ['https://untamedai.me', 'https://github.com/wkddns40'],
  knowsAbout: [
    'Physical AI',
    'Manufacturing AI',
    'Foundation Model Data',
    'Robot Telemetry',
    'LLM Product Operations',
  ],
} as const
