import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Plus, Trash2, Upload, X } from 'lucide-react'
import { api } from '../../lib/api'

const inputClass =
  'w-full px-4 py-3 rounded-lg bg-black border border-gray-800 focus:outline-none focus:border-orange-500'
const labelClass = 'block text-sm text-gray-300 mb-2'

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function GalleryFilePreview({ file }) {
  const [src, setSrc] = useState('')

  useEffect(() => {
    const url = URL.createObjectURL(file)
    setSrc(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  if (!src) return <div className="h-28 w-full bg-gray-900" />
  return <img src={src} alt={file.name} className="h-28 w-full object-cover" />
}

const emptyForm = {
  title: '',
  category: '',
  duration: '',
  description: '',
  imageUrl: '',
  imageFile: null,
  galleryFiles: [],
  galleryUrlDraft: '',
  existingGallery: [],
  removeGalleryIds: [],
  videos: [{ label: '', url: '' }],
  links: [{ label: '', url: '' }],
  customFields: [{ id: createId(), label: 'Client', value: '' }],
}

function AdminPortfolio() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const preview = useMemo(() => {
    if (form.imageFile) return URL.createObjectURL(form.imageFile)
    return form.imageUrl || ''
  }, [form.imageFile, form.imageUrl])

  useEffect(() => {
    if (!form.imageFile) return undefined
    return () => URL.revokeObjectURL(preview)
  }, [form.imageFile, preview])

  const loadItems = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await api.getPortfolio()
      setItems(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Failed to load portfolio')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const resetForm = () => {
    setForm({
      ...emptyForm,
      videos: [{ label: '', url: '' }],
      links: [{ label: '', url: '' }],
      customFields: [{ id: createId(), label: 'Client', value: '' }],
      galleryFiles: [],
      existingGallery: [],
      removeGalleryIds: [],
    })
    setEditingId(null)
  }

  const startEdit = (item) => {
    setEditingId(item.id)
    setForm({
      title: item.title || '',
      category: item.category || '',
      duration: item.duration || '',
      description: item.description || '',
      imageUrl: item.imageUrl || '',
      imageFile: null,
      galleryFiles: [],
      galleryUrlDraft: '',
      existingGallery: item.gallery || [],
      removeGalleryIds: [],
      videos:
        item.videos?.length > 0
          ? item.videos.map((entry) => ({
              label: entry.label || '',
              url: entry.url || '',
            }))
          : [{ label: '', url: '' }],
      links:
        item.links?.length > 0
          ? item.links.map((entry) => ({
              label: entry.label || '',
              url: entry.url || '',
            }))
          : [{ label: '', url: '' }],
      customFields:
        item.customFields?.length > 0
          ? item.customFields.map((entry) => ({
              id: entry.id || createId(),
              label: entry.label || 'Field',
              value: entry.value || '',
            }))
          : [{ id: createId(), label: 'Client', value: '' }],
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateRow = (key, index, field, value) => {
    setForm((prev) => {
      const next = [...prev[key]]
      next[index] = { ...next[index], [field]: value }
      return { ...prev, [key]: next }
    })
  }

  const addRow = (key, template) => {
    setForm((prev) => ({ ...prev, [key]: [...prev[key], template] }))
  }

  const removeRow = (key, index) => {
    setForm((prev) => {
      const next = prev[key].filter((_, i) => i !== index)
      return {
        ...prev,
        [key]: next.length ? next : [key === 'customFields'
          ? { id: createId(), label: 'Field', value: '' }
          : { label: '', url: '' }],
      }
    })
  }

  const addGalleryUrl = () => {
    const url = form.galleryUrlDraft.trim()
    if (!url) return
    setForm((prev) => ({
      ...prev,
      galleryUrlDraft: '',
      existingGallery: [...prev.existingGallery, { id: createId(), url, isNew: true }],
    }))
  }

  const addGalleryFiles = (fileList) => {
    const files = Array.from(fileList || [])
    if (!files.length) return
    setForm((prev) => ({
      ...prev,
      galleryFiles: [...prev.galleryFiles, ...files],
    }))
  }

  const removeGalleryFile = (index) => {
    setForm((prev) => ({
      ...prev,
      galleryFiles: prev.galleryFiles.filter((_, i) => i !== index),
    }))
  }

  const removeExistingGallery = (id) => {
    setForm((prev) => {
      const entry = prev.existingGallery.find((item) => item.id === id)
      const wasStored = Boolean(entry && !entry.isNew)
      return {
        ...prev,
        existingGallery: prev.existingGallery.filter((item) => item.id !== id),
        removeGalleryIds: wasStored
          ? [...prev.removeGalleryIds, id]
          : prev.removeGalleryIds,
      }
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')

    try {
      const body = new FormData()
      body.append('title', form.title.trim())
      body.append('category', form.category.trim())
      body.append('duration', form.duration.trim())
      body.append('description', form.description.trim())

      if (form.imageFile) {
        body.append('image', form.imageFile)
      } else if (
        form.imageUrl.trim() &&
        !/\/api\/portfolio\/[^/]+\/image/.test(form.imageUrl.trim())
      ) {
        body.append('imageUrl', form.imageUrl.trim())
      } else if (!editingId) {
        setError('Thumbnail image file or URL is required')
        setSaving(false)
        return
      }

      const newGalleryUrls = form.existingGallery
        .filter((entry) => entry.isNew)
        .map((entry) => ({ url: entry.url }))
      body.append('galleryUrls', JSON.stringify(newGalleryUrls))
      body.append('removeGalleryIds', JSON.stringify(form.removeGalleryIds))

      form.galleryFiles.forEach((file) => body.append('galleryFiles', file))

      body.append(
        'videos',
        JSON.stringify(
          form.videos.filter((entry) => entry.url.trim()).map((entry) => ({
            label: entry.label.trim(),
            url: entry.url.trim(),
          }))
        )
      )
      body.append(
        'links',
        JSON.stringify(
          form.links.filter((entry) => entry.url.trim()).map((entry) => ({
            label: entry.label.trim(),
            url: entry.url.trim(),
          }))
        )
      )
      body.append(
        'customFields',
        JSON.stringify(
          form.customFields
            .filter((entry) => entry.label.trim() || entry.value.trim())
            .map((entry) => ({
              id: entry.id,
              label: entry.label.trim() || 'Field',
              value: entry.value.trim(),
            }))
        )
      )

      if (editingId) await api.updatePortfolioItem(editingId, body)
      else await api.createPortfolioItem(body)

      resetForm()
      await loadItems()
    } catch (err) {
      setError(err.message || 'Failed to save item')
    } finally {
      setSaving(false)
    }
  }

  const onDelete = async (id) => {
    if (!window.confirm('Delete this portfolio item?')) return
    try {
      await api.deletePortfolioItem(id)
      if (editingId === id) resetForm()
      await loadItems()
    } catch (err) {
      setError(err.message || 'Failed to delete item')
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Portfolio <span className="text-orange-500">Admin</span>
        </h1>
        <p className="text-gray-400">
          Manage thumbnail, gallery, videos, links, and custom fields (editable names).
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">
            {editingId ? 'Edit project' : 'Add project'}
          </h2>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-sm text-gray-400 hover:text-white">
              Cancel edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="title">Title</label>
            <input id="title" required value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className={inputClass} placeholder="Project title" />
          </div>
          <div>
            <label className={labelClass} htmlFor="category">Category</label>
            <input id="category" required value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className={inputClass} placeholder="Branding, SEO..." />
          </div>
          <div>
            <label className={labelClass} htmlFor="duration">Duration</label>
            <input id="duration" required value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} className={inputClass} placeholder="3 months" />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="description">Short overview</label>
          <textarea id="description" required rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className={inputClass} placeholder="Brief project overview" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="image">
              {editingId ? 'Replace thumbnail' : 'Thumbnail upload'}{' '}
              <span className="text-orange-500">*</span>
            </label>
            <label htmlFor="image" className="flex items-center justify-center gap-2 w-full px-4 py-8 rounded-lg border border-dashed border-gray-700 hover:border-orange-500 cursor-pointer bg-black/40">
              <Upload size={18} className="text-orange-500" />
              <span className="text-sm text-gray-300">
                {form.imageFile
                  ? form.imageFile.name
                  : editingId
                    ? 'Choose a new thumbnail to replace'
                    : 'Choose thumbnail'}
              </span>
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null
                setForm((p) => ({
                  ...p,
                  imageFile: file,
                  // Clear old URL so the new file is used as the thumbnail source
                  imageUrl: file ? '' : p.imageUrl,
                }))
              }}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="imageUrl">Or thumbnail URL</label>
            <input
              id="imageUrl"
              value={form.imageUrl}
              onChange={(e) =>
                setForm((p) => ({ ...p, imageUrl: e.target.value, imageFile: null }))
              }
              className={inputClass}
              placeholder="https://..."
            />
            {preview && (
              <img src={preview} alt="Thumbnail preview" className="mt-3 h-32 w-full object-cover rounded-lg border border-gray-800" />
            )}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-gray-800 bg-black/30 p-5">
          <div>
            <h3 className="font-semibold text-orange-500 text-lg">Project gallery</h3>
            <p className="text-sm text-gray-400 mt-1">
              Upload multiple images for the project carousel. You can add more anytime while editing.
            </p>
          </div>

          {(form.existingGallery.length > 0 || form.galleryFiles.length > 0) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {form.existingGallery.map((entry) => (
                <div key={entry.id} className="relative rounded-lg overflow-hidden border border-gray-800 group">
                  <img src={entry.url} alt="" className="h-28 w-full object-cover" />
                  <span className="absolute bottom-1 left-1 text-[10px] px-1.5 py-0.5 rounded bg-black/70 text-gray-300">
                    Saved
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExistingGallery(entry.id)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/70 hover:bg-red-500"
                    aria-label="Remove image"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {form.galleryFiles.map((file, index) => (
                <div key={`${file.name}-${file.size}-${index}`} className="relative rounded-lg overflow-hidden border border-orange-500/40 group">
                  <GalleryFilePreview file={file} />
                  <span className="absolute bottom-1 left-1 text-[10px] px-1.5 py-0.5 rounded bg-orange-500 text-white">
                    New
                  </span>
                  <button
                    type="button"
                    onClick={() => removeGalleryFile(index)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/70 hover:bg-red-500"
                    aria-label="Remove pending image"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <label
            htmlFor="galleryFiles"
            className="flex flex-col items-center justify-center gap-2 w-full px-4 py-10 rounded-xl border border-dashed border-gray-700 hover:border-orange-500 cursor-pointer bg-black/40 transition-colors"
          >
            <Upload size={22} className="text-orange-500" />
            <span className="text-sm font-medium text-white">Add more gallery images</span>
            <span className="text-xs text-gray-400">Select multiple images at once (JPG, PNG, WEBP)</span>
          </label>
          <input
            id="galleryFiles"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              addGalleryFiles(e.target.files)
              e.target.value = ''
            }}
          />

          <div>
            <label className={labelClass} htmlFor="galleryUrlDraft">Or paste an image URL</label>
            <div className="flex gap-2">
              <input
                id="galleryUrlDraft"
                value={form.galleryUrlDraft}
                onChange={(e) => setForm((p) => ({ ...p, galleryUrlDraft: e.target.value }))}
                className={inputClass}
                placeholder="https://..."
              />
              <button
                type="button"
                onClick={addGalleryUrl}
                className="px-4 rounded-lg bg-orange-500 hover:bg-orange-600 shrink-0"
              >
                Add URL
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Gallery count: {form.existingGallery.length + form.galleryFiles.length} image(s)
            {form.galleryFiles.length > 0
              ? ` · ${form.galleryFiles.length} new file(s) will upload on save`
              : ''}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-orange-500">Videos</h3>
            <button
              type="button"
              onClick={() => addRow('videos', { label: '', url: '' })}
              className="text-sm text-orange-500 hover:text-orange-400"
            >
              + Add video
            </button>
          </div>
          {form.videos.map((entry, index) => (
            <div key={`video-${index}`} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-2">
              <input
                value={entry.label}
                onChange={(e) => updateRow('videos', index, 'label', e.target.value)}
                className={inputClass}
                placeholder="Label"
              />
              <input
                value={entry.url}
                onChange={(e) => updateRow('videos', index, 'url', e.target.value)}
                className={inputClass}
                placeholder="YouTube / Vimeo / mp4 URL"
              />
              <button type="button" onClick={() => removeRow('videos', index)} className="px-3 rounded-lg border border-gray-800 hover:border-red-500 text-red-400">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-orange-500">URLs / Links</h3>
            <button
              type="button"
              onClick={() => addRow('links', { label: '', url: '' })}
              className="text-sm text-orange-500 hover:text-orange-400"
            >
              + Add URL
            </button>
          </div>
          {form.links.map((entry, index) => (
            <div key={`link-${index}`} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-2">
              <input
                value={entry.label}
                onChange={(e) => updateRow('links', index, 'label', e.target.value)}
                className={inputClass}
                placeholder="Label (e.g. Live site)"
              />
              <input
                value={entry.url}
                onChange={(e) => updateRow('links', index, 'url', e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
              <button type="button" onClick={() => removeRow('links', index)} className="px-3 rounded-lg border border-gray-800 hover:border-red-500 text-red-400">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-orange-500">Custom fields</h3>
            <button
              type="button"
              onClick={() =>
                addRow('customFields', { id: createId(), label: 'New field', value: '' })
              }
              className="text-sm text-orange-500 hover:text-orange-400"
            >
              + Add field
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Edit the field name on the left and its value on the right.
          </p>
          {form.customFields.map((entry, index) => (
            <div key={entry.id} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-2">
              <input
                value={entry.label}
                onChange={(e) => updateRow('customFields', index, 'label', e.target.value)}
                className={inputClass}
                placeholder="Field name"
              />
              <input
                value={entry.value}
                onChange={(e) => updateRow('customFields', index, 'value', e.target.value)}
                className={inputClass}
                placeholder="Field value"
              />
              <button type="button" onClick={() => removeRow('customFields', index)} className="px-3 rounded-lg border border-gray-800 hover:border-red-500 text-red-400">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-60 font-medium"
        >
          <Plus size={18} />
          {saving ? 'Saving...' : editingId ? 'Update project' : 'Add project'}
        </button>
      </form>

      <section>
        <h2 className="text-xl font-semibold mb-4">Projects ({items.length})</h2>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-400">No portfolio items yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <article key={item.id} className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-900">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title || 'Portfolio'} className="h-48 w-full object-cover" />
                ) : (
                  <div className="h-48 w-full bg-black flex items-center justify-center text-gray-500 text-sm">
                    No image
                  </div>
                )}
                <div className="p-4 space-y-2">
                  {item.category && (
                    <p className="text-orange-500 text-xs uppercase">{item.category}</p>
                  )}
                  <h3 className="font-semibold">{item.title || 'Untitled project'}</h3>
                  {item.duration && <p className="text-sm text-gray-400">{item.duration}</p>}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button type="button" onClick={() => startEdit(item)} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-black border border-gray-800 hover:border-orange-500 text-sm">
                      <Pencil size={14} />
                      Edit
                    </button>
                    <Link to={`/portfolio/${item.id}`} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-black border border-gray-800 hover:border-orange-500 text-sm">
                      View
                    </Link>
                    <button type="button" onClick={() => onDelete(item.id)} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-black border border-gray-800 hover:border-red-500 text-sm text-red-400">
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default AdminPortfolio
