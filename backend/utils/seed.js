import Portfolio from '../models/Portfolio.js'
import { randomUUID } from 'crypto'

const SEED_ITEMS = [
  {
    title: 'Flexora Growth Campaign',
    category: 'Digital Marketing',
    duration: '4 months',
    description:
      'A performance-led campaign that scaled Flexora’s paid acquisition and brand awareness across Meta and Google.',
    imageUrl:
      'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1764938834/1240_gekudg.jpg',
    galleryImages: [
      {
        url: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1764938817/1239_j3ajsn.jpg',
      },
      {
        url: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1764938816/1238_x7wnz4.jpg',
      },
    ],
    videos: [
      {
        label: 'Campaign highlight',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
    ],
    links: [
      { label: 'Live campaign', url: 'https://digitalbuddiess.com' },
      { label: 'Case deck', url: 'https://digitalbuddiess.com' },
    ],
    customFields: [
      { id: randomUUID(), label: 'Client', value: 'Flexora Fitness' },
      { id: randomUUID(), label: 'Industry', value: 'Health & Fitness' },
      { id: randomUUID(), label: 'ROAS', value: '4.8x' },
      { id: randomUUID(), label: 'Lead Growth', value: '+162%' },
    ],
  },
  {
    title: 'GreenBrew Brand Identity',
    category: 'Branding',
    duration: '8 weeks',
    description:
      'A complete brand system for a specialty coffee startup—from positioning and visual identity to packaging guidelines.',
    imageUrl:
      'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1764938817/1239_j3ajsn.jpg',
    galleryImages: [
      {
        url: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1764938779/1234_hyml8h.jpg',
      },
    ],
    videos: [],
    links: [{ label: 'Brand site', url: 'https://digitalbuddiess.com' }],
    customFields: [
      { id: randomUUID(), label: 'Client', value: 'GreenBrew' },
      { id: randomUUID(), label: 'Deliverables', value: 'Logo, packaging, brand book' },
    ],
  },
]

export async function seedPortfolioIfEmpty() {
  const count = await Portfolio.countDocuments()
  if (count > 0) return

  await Portfolio.insertMany(SEED_ITEMS)
  console.log(`Seeded ${SEED_ITEMS.length} flexible portfolio items`)
}
