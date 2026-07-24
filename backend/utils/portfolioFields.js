function parseJsonArray(value, fallback = []) {
  if (value === undefined || value === null || value === '') return fallback
  if (Array.isArray(value)) return value

  try {
    const parsed = JSON.parse(String(value))
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

function normalizeLabeledUrls(value) {
  return parseJsonArray(value)
    .map((item) => ({
      label: String(item?.label || '').trim(),
      url: String(item?.url || '').trim(),
    }))
    .filter((item) => item.url)
}

function normalizeCustomFields(value) {
  return parseJsonArray(value)
    .map((item, index) => ({
      id: String(item?.id || `field-${index + 1}`),
      label: String(item?.label || 'Field').trim() || 'Field',
      value: String(item?.value || '').trim(),
    }))
    .filter((item) => item.label || item.value)
}

function normalizeGalleryUrls(value) {
  return parseJsonArray(value)
    .map((item) => {
      if (typeof item === 'string') {
        return { url: item.trim() }
      }
      return { url: String(item?.url || '').trim() }
    })
    .filter((item) => item.url)
}

export function buildPortfolioFields(body = {}) {
  const fields = {}

  for (const key of ['title', 'category', 'duration', 'description', 'imageUrl']) {
    if (body[key] !== undefined) {
      fields[key] = String(body[key]).trim()
    }
  }

  if (body.videos !== undefined) fields.videos = normalizeLabeledUrls(body.videos)
  if (body.links !== undefined) fields.links = normalizeLabeledUrls(body.links)
  if (body.customFields !== undefined) {
    fields.customFields = normalizeCustomFields(body.customFields)
  }
  if (body.galleryUrls !== undefined) {
    fields._galleryUrls = normalizeGalleryUrls(body.galleryUrls)
  }
  if (body.removeGalleryIds !== undefined) {
    fields._removeGalleryIds = parseJsonArray(body.removeGalleryIds).map(String)
  }

  return fields
}
