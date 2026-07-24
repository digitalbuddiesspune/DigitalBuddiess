import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import Portfolio from '../models/Portfolio.js'
import { uploadPortfolioMedia } from '../utils/upload.js'
import { buildPortfolioFields } from '../utils/portfolioFields.js'

const router = Router()

function toClientItem(doc) {
  return doc.toJSON()
}

function applyGalleryUpdates(item, fields, files = {}) {
  const removeIds = new Set(fields._removeGalleryIds || [])
  if (removeIds.size > 0) {
    item.galleryImages = (item.galleryImages || []).filter(
      (entry) => !removeIds.has(entry._id.toString())
    )
  }

  const urlEntries = fields._galleryUrls || []
  for (const entry of urlEntries) {
    item.galleryImages.push({ url: entry.url })
  }

  const uploaded = files.galleryFiles || []
  for (const file of uploaded) {
    item.galleryImages.push({
      data: file.buffer,
      contentType: file.mimetype,
      url: '',
    })
  }

  delete fields._galleryUrls
  delete fields._removeGalleryIds
}

router.get('/', async (_req, res, next) => {
  try {
    const items = await Portfolio.find()
      .select('-image.data -galleryImages.data')
      .sort({ createdAt: -1 })

    res.json(items.map(toClientItem))
  } catch (error) {
    next(error)
  }
})

router.get('/:id/image', async (req, res, next) => {
  try {
    const item = await Portfolio.findById(req.params.id).select('image imageUrl')
    if (!item) {
      return res.status(404).json({ message: 'Portfolio item not found' })
    }

    if (item.image?.data && item.image.contentType) {
      res.set('Content-Type', item.image.contentType)
      res.set('Cache-Control', 'no-cache, must-revalidate')
      return res.send(item.image.data)
    }

    if (item.imageUrl) {
      return res.redirect(item.imageUrl)
    }

    return res.status(404).json({ message: 'Image not found' })
  } catch (error) {
    next(error)
  }
})

router.get('/:id/gallery/:imageId', async (req, res, next) => {
  try {
    const item = await Portfolio.findById(req.params.id).select('galleryImages')
    if (!item) {
      return res.status(404).json({ message: 'Portfolio item not found' })
    }

    const image = item.galleryImages.id(req.params.imageId)
    if (!image) {
      return res.status(404).json({ message: 'Gallery image not found' })
    }

    if (image.data && image.contentType) {
      res.set('Content-Type', image.contentType)
      res.set('Cache-Control', 'public, max-age=86400')
      return res.send(image.data)
    }

    if (image.url) {
      return res.redirect(image.url)
    }

    return res.status(404).json({ message: 'Gallery image not found' })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Portfolio.findById(req.params.id).select(
      '-image.data -galleryImages.data'
    )
    if (!item) {
      return res.status(404).json({ message: 'Portfolio item not found' })
    }
    res.json(toClientItem(item))
  } catch (error) {
    next(error)
  }
})

router.post('/', requireAuth, uploadPortfolioMedia, async (req, res, next) => {
  try {
    const fields = buildPortfolioFields(req.body || {})

    if (!fields.title) {
      return res.status(400).json({ message: 'Title is required' })
    }
    if (!fields.category) {
      return res.status(400).json({ message: 'Category is required' })
    }
    if (!fields.duration) {
      return res.status(400).json({ message: 'Duration is required' })
    }
    if (!fields.description) {
      return res.status(400).json({ message: 'Short overview is required' })
    }

    const thumbnail = req.files?.image?.[0]
    if (thumbnail) {
      fields.image = {
        data: thumbnail.buffer,
        contentType: thumbnail.mimetype,
      }
      fields.imageUrl = ''
    } else if (!fields.imageUrl) {
      return res.status(400).json({ message: 'Thumbnail image file or URL is required' })
    }

    const item = new Portfolio({
      title: fields.title,
      category: fields.category,
      duration: fields.duration,
      description: fields.description,
      imageUrl: fields.imageUrl || '',
      image: fields.image,
      videos: fields.videos || [],
      links: fields.links || [],
      customFields: fields.customFields || [],
      galleryImages: [],
    })

    applyGalleryUpdates(item, fields, req.files)
    await item.save()

    const safe = await Portfolio.findById(item._id).select(
      '-image.data -galleryImages.data'
    )
    res.status(201).json(toClientItem(safe))
  } catch (error) {
    next(error)
  }
})

router.put('/:id', requireAuth, uploadPortfolioMedia, async (req, res, next) => {
  try {
    const item = await Portfolio.findById(req.params.id)
    if (!item) {
      return res.status(404).json({ message: 'Portfolio item not found' })
    }

    const fields = buildPortfolioFields(req.body || {})

    if (fields.title !== undefined) {
      if (!fields.title) {
        return res.status(400).json({ message: 'Title is required' })
      }
      item.title = fields.title
    }
    if (fields.category !== undefined) {
      if (!fields.category) {
        return res.status(400).json({ message: 'Category is required' })
      }
      item.category = fields.category
    }
    if (fields.duration !== undefined) {
      if (!fields.duration) {
        return res.status(400).json({ message: 'Duration is required' })
      }
      item.duration = fields.duration
    }
    if (fields.description !== undefined) {
      if (!fields.description) {
        return res.status(400).json({ message: 'Short overview is required' })
      }
      item.description = fields.description
    }
    if (fields.videos !== undefined) item.videos = fields.videos
    if (fields.links !== undefined) item.links = fields.links
    if (fields.customFields !== undefined) item.customFields = fields.customFields

    const thumbnail = req.files?.image?.[0]
    if (thumbnail) {
      item.set('image', {
        data: thumbnail.buffer,
        contentType: thumbnail.mimetype,
      })
      item.markModified('image')
      item.imageUrl = ''
    } else if (fields.imageUrl !== undefined && fields.imageUrl) {
      // Ignore our own served image path so edits don't wipe the stored binary
      const isInternalImagePath = /\/api\/portfolio\/[^/]+\/image/.test(fields.imageUrl)
      if (!isInternalImagePath) {
        item.imageUrl = fields.imageUrl
        item.set('image', undefined)
        item.markModified('image')
      }
    } else if (fields.imageUrl !== undefined && !fields.imageUrl) {
      if (!item.image?.data && !item.imageUrl) {
        return res.status(400).json({ message: 'Thumbnail image file or URL is required' })
      }
    }

    applyGalleryUpdates(item, fields, req.files)
    item.updatedAt = new Date()
    await item.save()

    const safe = await Portfolio.findById(item._id).select(
      '-image.data -galleryImages.data'
    )
    res.json(toClientItem(safe))
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const deleted = await Portfolio.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Portfolio item not found' })
    }
    res.json({ message: 'Deleted' })
  } catch (error) {
    next(error)
  }
})

export default router
