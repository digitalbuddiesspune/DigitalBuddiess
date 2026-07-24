import { randomUUID } from 'crypto'
import Portfolio from '../models/Portfolio.js'

function pushField(fields, label, value) {
  if (!value) return
  fields.push({ id: randomUUID(), label, value: String(value) })
}

export async function migrateLegacyPortfolioFields() {
  const docs = await Portfolio.collection.find({}).toArray()
  let migrated = 0

  for (const doc of docs) {
    const hasFlexibleData =
      (doc.customFields && doc.customFields.length > 0) ||
      (doc.galleryImages && doc.galleryImages.length > 0) ||
      (doc.videos && doc.videos.length > 0) ||
      (doc.links && doc.links.length > 0)

    if (hasFlexibleData) continue

    const customFields = []
    pushField(customFields, 'Client', doc.client)
    pushField(customFields, 'Industry', doc.industry)
    pushField(customFields, 'Year', doc.year)
    pushField(customFields, 'Location', doc.location)
    pushField(customFields, 'Challenge', doc.challenge)
    pushField(customFields, 'Strategy', doc.strategy)
    pushField(customFields, 'Solution', doc.solution)
    pushField(customFields, 'Results', doc.results)

    if (Array.isArray(doc.services) && doc.services.length) {
      pushField(customFields, 'Services', doc.services.join(', '))
    }
    if (Array.isArray(doc.tools) && doc.tools.length) {
      pushField(customFields, 'Tools', doc.tools.join(', '))
    }
    if (Array.isArray(doc.deliverables) && doc.deliverables.length) {
      pushField(customFields, 'Deliverables', doc.deliverables.join(', '))
    }
    if (Array.isArray(doc.metrics)) {
      for (const metric of doc.metrics) {
        if (metric?.label || metric?.value) {
          pushField(customFields, metric.label || 'Metric', metric.value || '')
        }
      }
    }
    if (doc.testimonial?.quote) {
      pushField(
        customFields,
        'Testimonial',
        `"${doc.testimonial.quote}" — ${doc.testimonial.author || ''}${
          doc.testimonial.role ? `, ${doc.testimonial.role}` : ''
        }`
      )
    }

    const galleryImages = []
    if (Array.isArray(doc.gallery)) {
      for (const url of doc.gallery) {
        if (url) galleryImages.push({ url: String(url) })
      }
    }

    const links = []
    if (doc.projectUrl) {
      links.push({ label: 'Project URL', url: String(doc.projectUrl) })
    }

    if (
      customFields.length === 0 &&
      galleryImages.length === 0 &&
      links.length === 0
    ) {
      continue
    }

    await Portfolio.collection.updateOne(
      { _id: doc._id },
      {
        $set: {
          customFields,
          galleryImages,
          videos: doc.videos || [],
          links,
          duration: doc.duration || '',
        },
      }
    )
    migrated += 1
  }

  if (migrated > 0) {
    console.log(`Migrated ${migrated} portfolio items to flexible fields`)
  }
}
