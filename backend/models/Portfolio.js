import mongoose from 'mongoose'

const labeledUrlSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, default: '' },
    url: { type: String, trim: true, default: '' },
  },
  { _id: false }
)

const customFieldSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    label: { type: String, trim: true, default: 'Field' },
    value: { type: String, trim: true, default: '' },
  },
  { _id: false }
)

const galleryImageSchema = new mongoose.Schema(
  {
    // External URL when not storing binary
    url: { type: String, trim: true, default: '' },
    // Uploaded image binary in MongoDB
    data: Buffer,
    contentType: String,
  },
  { _id: true }
)

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    // Short overview
    description: {
      type: String,
      required: true,
      trim: true,
    },
    // Thumbnail (cover)
    imageUrl: {
      type: String,
      default: '',
      trim: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    // Extra images (URLs and/or Mongo binaries)
    galleryImages: {
      type: [galleryImageSchema],
      default: [],
    },
    // Video links (YouTube, Vimeo, mp4, etc.)
    videos: {
      type: [labeledUrlSchema],
      default: [],
    },
    // Any other URLs
    links: {
      type: [labeledUrlSchema],
      default: [],
    },
    // Admin-defined fields (editable names + values)
    customFields: {
      type: [customFieldSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        const id = ret._id.toString()
        const hasBinary = Boolean(ret.image?.data || ret.image?.contentType)
        const cacheKey = ret.updatedAt
          ? new Date(ret.updatedAt).getTime()
          : Date.now()

        const gallery = (ret.galleryImages || [])
          .map((entry, index) => {
            const entryId = entry._id?.toString?.() || String(index)
            if (entry.data || entry.contentType) {
              return {
                id: entryId,
                url: `/api/portfolio/${id}/gallery/${entryId}?v=${cacheKey}`,
              }
            }
            if (!entry.url) return null
            return { id: entryId, url: entry.url }
          })
          .filter(Boolean)

        return {
          id,
          title: ret.title || '',
          category: ret.category || '',
          duration: ret.duration || '',
          description: ret.description || '',
          imageUrl: hasBinary
            ? `/api/portfolio/${id}/image?v=${cacheKey}`
            : ret.imageUrl || '',
          gallery,
          videos: ret.videos || [],
          links: ret.links || [],
          customFields: ret.customFields || [],
          createdAt: ret.createdAt,
          updatedAt: ret.updatedAt,
        }
      },
    },
  }
)

portfolioSchema.index({ createdAt: -1 })

const Portfolio = mongoose.model('Portfolio', portfolioSchema)

export default Portfolio
