import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Image as ImageIcon,
  Play,
  Video,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { api } from '../lib/api'

function getEmbedUrl(url = '') {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace('www.', '')

    if (host.includes('youtube.com')) {
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}?rel=0` : null
    }
    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1)
      return id ? `https://www.youtube.com/embed/${id}?rel=0` : null
    }
    if (host.includes('vimeo.com')) {
      const id = parsed.pathname.split('/').filter(Boolean).pop()
      return id ? `https://player.vimeo.com/video/${id}` : null
    }
  } catch {
    return null
  }
  return null
}

function isDirectVideo(url = '') {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url)
}

function getYoutubeThumb(url = '') {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace('www.', '')
    let id = null
    if (host.includes('youtube.com')) id = parsed.searchParams.get('v')
    if (host === 'youtu.be') id = parsed.pathname.slice(1)
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
  } catch {
    return null
  }
}

function PortfolioDetail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mediaTab, setMediaTab] = useState('images')
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeVideo, setActiveVideo] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const thumbRefs = useRef([])

  const MIN_ZOOM = 1
  const MAX_ZOOM = 4
  const ZOOM_STEP = 0.5

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveIndex(0)
    setActiveVideo(0)
    setMediaTab('images')
    setLightboxOpen(false)
    setZoom(1)
  }, [id])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError('')
        const [detail, all] = await Promise.all([
          api.getPortfolioItem(id),
          api.getPortfolio(),
        ])
        if (cancelled) return
        setItem(detail)
        const list = Array.isArray(all) ? all : []
        setRelated(list.filter((entry) => entry.id !== id).slice(0, 3))
        const hasImages =
          Boolean(detail.imageUrl) || (detail.gallery || []).length > 0
        const hasVideos = (detail.videos || []).length > 0
        if (!hasImages && hasVideos) setMediaTab('videos')
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load project')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [id])

  const slides = useMemo(() => {
    if (!item) return []
    const urls = []
    if (item.imageUrl) urls.push(item.imageUrl)
    for (const entry of item.gallery || []) {
      if (entry?.url && !urls.includes(entry.url)) urls.push(entry.url)
    }
    return urls
  }, [item])

  const videos = item?.videos || []

  useEffect(() => {
    if (activeIndex >= slides.length) setActiveIndex(0)
  }, [slides.length, activeIndex])

  useEffect(() => {
    const node = thumbRefs.current[activeIndex]
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [activeIndex])

  useEffect(() => {
    if (mediaTab !== 'images' || slides.length < 2) return undefined

    const onKey = (event) => {
      if (lightboxOpen) return
      if (event.key === 'ArrowLeft') {
        setActiveIndex((index) => (index - 1 + slides.length) % slides.length)
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((index) => (index + 1) % slides.length)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slides.length, mediaTab, lightboxOpen])

  useEffect(() => {
    if (!lightboxOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false)
        setZoom(1)
      }
      if (event.key === 'ArrowLeft' && slides.length > 1) {
        setActiveIndex((index) => (index - 1 + slides.length) % slides.length)
        setZoom(1)
      }
      if (event.key === 'ArrowRight' && slides.length > 1) {
        setActiveIndex((index) => (index + 1) % slides.length)
        setZoom(1)
      }
      if (event.key === '+' || event.key === '=') {
        setZoom((value) => Math.min(MAX_ZOOM, Number((value + ZOOM_STEP).toFixed(2))))
      }
      if (event.key === '-' || event.key === '_') {
        setZoom((value) => Math.max(MIN_ZOOM, Number((value - ZOOM_STEP).toFixed(2))))
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxOpen, slides.length])

  const openLightbox = () => {
    if (!slides.length) return
    setZoom(1)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setZoom(1)
  }

  const zoomIn = () => {
    setZoom((value) => Math.min(MAX_ZOOM, Number((value + ZOOM_STEP).toFixed(2))))
  }

  const zoomOut = () => {
    setZoom((value) => Math.max(MIN_ZOOM, Number((value - ZOOM_STEP).toFixed(2))))
  }

  const goPrev = () => {
    if (slides.length < 2) return
    setActiveIndex((index) => (index - 1 + slides.length) % slides.length)
    setZoom(1)
  }

  const goNext = () => {
    if (slides.length < 2) return
    setActiveIndex((index) => (index + 1) % slides.length)
    setZoom(1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="h-16 bg-black" />
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
          <div className="bg-[#0d0d0d] animate-pulse" />
          <div className="bg-[#111] animate-pulse" />
        </div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-red-400 mb-6">{error || 'Project not found'}</p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400"
          >
            <ArrowLeft size={18} />
            Back to portfolio
          </Link>
        </div>
      </div>
    )
  }

  const links = item.links || []
  const title = item.title || 'Untitled project'
  const activeImage = slides[activeIndex] || ''
  const currentVideo = videos[activeVideo]
  const hasImages = slides.length > 0
  const hasVideos = videos.length > 0

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="h-16 bg-black" aria-hidden="true" />

      {/* 50 / 50 split */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Left: media */}
        <div className="relative flex flex-col bg-[#070707] border-b lg:border-b-0 lg:border-r border-white/10 min-h-[70vh] lg:min-h-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.12),transparent_55%)] pointer-events-none" />

          <div className="relative z-10 px-4 sm:px-6 pt-5 pb-4 flex items-center justify-between gap-3">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-subheading font-medium text-white/55 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Portfolio
            </Link>

            {(hasImages || hasVideos) && (
              <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setMediaTab('images')}
                  disabled={!hasImages}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-subheading font-medium transition-all cursor-pointer ${
                    mediaTab === 'images'
                      ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.35)]'
                      : 'text-white/55 hover:text-white disabled:opacity-30'
                  }`}
                >
                  <ImageIcon size={15} />
                  Images
                  {hasImages && (
                    <span className="text-[10px] opacity-80">{slides.length}</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setMediaTab('videos')}
                  disabled={!hasVideos}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-subheading font-medium transition-all cursor-pointer ${
                    mediaTab === 'videos'
                      ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.35)]'
                      : 'text-white/55 hover:text-white disabled:opacity-30'
                  }`}
                >
                  <Video size={15} />
                  Videos
                  {hasVideos && (
                    <span className="text-[10px] opacity-80">{videos.length}</span>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 pb-6 min-h-0">
            <AnimatePresence mode="wait">
              {mediaTab === 'images' ? (
                <motion.div
                  key="images"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  <div className="relative flex-1 min-h-[42vh] rounded-2xl overflow-hidden bg-black ring-1 ring-white/10 flex items-center justify-center">
                    {activeImage ? (
                      <>
                        <button
                          type="button"
                          onClick={openLightbox}
                          className="absolute inset-0 z-10 cursor-zoom-in"
                          aria-label="Open image fullscreen"
                        >
                          <img
                            src={activeImage}
                            alt={`${title} — image ${activeIndex + 1}`}
                            className="w-full h-full object-contain pointer-events-none"
                          />
                        </button>
                        {slides.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={goPrev}
                              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/15 hover:bg-orange-500 hover:border-orange-500 flex items-center justify-center transition-colors"
                              aria-label="Previous"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button
                              type="button"
                              onClick={goNext}
                              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/15 hover:bg-orange-500 hover:border-orange-500 flex items-center justify-center transition-colors"
                              aria-label="Next"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </>
                        )}
                        <div className="absolute bottom-3 left-3 z-20 text-xs px-2.5 py-1 rounded-full bg-black/70 text-white/70 pointer-events-none">
                          Click to zoom
                        </div>
                        <div className="absolute bottom-3 right-3 z-20 text-xs px-2.5 py-1 rounded-full bg-black/70 text-white/70">
                          {activeIndex + 1} / {slides.length}
                        </div>
                      </>
                    ) : (
                      <p className="text-white/35 text-sm">No images yet</p>
                    )}
                  </div>

                  {slides.length > 0 && (
                    <div className="mt-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      <div className="flex gap-2.5 min-w-min">
                        {slides.map((url, index) => {
                          const active = index === activeIndex
                          return (
                            <button
                              key={`${url}-${index}`}
                              type="button"
                              ref={(node) => {
                                thumbRefs.current[index] = node
                              }}
                              onClick={() => setActiveIndex(index)}
                              className={`relative shrink-0 w-20 sm:w-24 aspect-[16/10] rounded-lg overflow-hidden transition-all ${
                                active
                                  ? 'ring-2 ring-orange-500 opacity-100'
                                  : 'ring-1 ring-white/10 opacity-50 hover:opacity-90'
                              }`}
                              aria-label={`Image ${index + 1}`}
                            >
                              <img
                                src={url}
                                alt=""
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="videos"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  <div className="relative flex-1 min-h-[42vh] rounded-2xl overflow-hidden bg-gradient-to-br from-[#141414] via-black to-[#1a0f08] ring-1 ring-orange-500/20 flex items-center justify-center">
                    <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />

                    {currentVideo ? (
                      <div className="relative z-10 w-full h-full p-3 sm:p-4 flex flex-col">
                        {currentVideo.label && (
                          <p className="text-xs uppercase tracking-[0.16em] text-orange-400 mb-3 shrink-0">
                            {currentVideo.label}
                          </p>
                        )}
                        <div className="flex-1 min-h-0 rounded-xl overflow-hidden bg-black ring-1 ring-white/10">
                          {getEmbedUrl(currentVideo.url) ? (
                            <iframe
                              key={currentVideo.url}
                              src={getEmbedUrl(currentVideo.url)}
                              title={currentVideo.label || title}
                              className="w-full h-full min-h-[280px]"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : isDirectVideo(currentVideo.url) ? (
                            <video
                              key={currentVideo.url}
                              src={currentVideo.url}
                              controls
                              className="w-full h-full min-h-[280px] object-contain bg-black"
                            />
                          ) : (
                            <div className="h-full min-h-[280px] flex flex-col items-center justify-center gap-4 p-6 text-center">
                              <div className="w-16 h-16 rounded-full bg-orange-500/15 text-orange-500 flex items-center justify-center">
                                <Play size={28} fill="currentColor" />
                              </div>
                              <a
                                href={currentVideo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400"
                              >
                                Open video
                                <ExternalLink size={16} />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="text-white/35 text-sm">No videos yet</p>
                    )}
                  </div>

                  {videos.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {videos.map((video, index) => {
                        const active = index === activeVideo
                        const thumb = getYoutubeThumb(video.url)
                        return (
                          <button
                            key={`${video.label}-${video.url}`}
                            type="button"
                            onClick={() => setActiveVideo(index)}
                            className={`group flex items-center gap-3 p-2.5 rounded-xl text-left transition-all ${
                              active
                                ? 'bg-orange-500/15 ring-1 ring-orange-500'
                                : 'bg-white/[0.03] ring-1 ring-white/10 hover:ring-orange-500/40'
                            }`}
                          >
                            <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-black shrink-0">
                              {thumb ? (
                                <img
                                  src={thumb}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-orange-500">
                                  <Video size={16} />
                                </div>
                              )}
                              <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                                <Play
                                  size={14}
                                  className={active ? 'text-orange-400' : 'text-white'}
                                  fill="currentColor"
                                />
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">
                                {video.label || `Video ${index + 1}`}
                              </p>
                              <p className="text-[11px] text-white/40 truncate">
                                {active ? 'Now playing' : 'Tap to play'}
                              </p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: project info */}
        <div className="relative flex flex-col justify-center bg-[#0a0a0a] px-6 sm:px-10 lg:px-14 py-10 lg:py-16">
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 blur-[100px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-xl"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5 text-sm">
              {item.category && (
                <span className="px-3 py-1 rounded-full text-[11px] font-subheading font-bold tracking-wide uppercase bg-orange-500 text-white">
                  {item.category}
                </span>
              )}
              {item.duration && (
                <span className="inline-flex items-center gap-1.5 text-white/55 font-subheading font-medium">
                  <Clock3 size={14} className="text-orange-400" />
                  {item.duration}
                </span>
              )}
            </div>

            <h1 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl leading-[1.15] tracking-tight mb-3">
              {title}
            </h1>

            {item.description && (
              <p className="font-paragraph font-normal text-xs sm:text-sm text-white/60 leading-[1.6] mb-6">
                {item.description}
              </p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-white/45 mb-8">
              {hasImages && (
                <span className="inline-flex items-center gap-1.5 font-subheading font-medium">
                  <ImageIcon size={14} className="text-orange-500" />
                  {slides.length} image{slides.length === 1 ? '' : 's'}
                </span>
              )}
              {hasVideos && (
                <span className="inline-flex items-center gap-1.5 font-subheading font-medium">
                  <Video size={14} className="text-orange-500" />
                  {videos.length} video{videos.length === 1 ? '' : 's'}
                </span>
              )}
            </div>

            {links.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-8">
                {links.map((link) => (
                  <a
                    key={`${link.label}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-orange-500 hover:bg-orange-400 text-sm font-subheading font-semibold transition-colors"
                  >
                    {link.label || 'Open link'}
                    <ExternalLink size={15} />
                  </a>
                ))}
              </div>
            )}

            {hasVideos && mediaTab !== 'videos' && (
              <button
                type="button"
                onClick={() => setMediaTab('videos')}
                className="inline-flex items-center gap-2 text-sm font-subheading font-semibold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
              >
                <Play size={14} fill="currentColor" />
                Watch project video
              </button>
            )}

            <div className="mt-10 pt-8 border-t border-white/10">
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 text-white hover:text-orange-400 transition-colors font-subheading font-semibold"
              >
                Start a similar project
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
            <div className="flex items-end justify-between gap-4 mb-10">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl leading-[1.15] tracking-tight">
                More projects
              </h2>
              <Link
                to="/portfolio"
                className="text-sm font-subheading font-medium text-white/45 hover:text-orange-400 transition-colors"
              >
                View all
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                >
                  <Link to={`/portfolio/${entry.id}`} className="group block">
                    <div className="overflow-hidden rounded-xl mb-4 bg-[#111] aspect-[16/11]">
                      {entry.imageUrl ? (
                        <img
                          src={entry.imageUrl}
                          alt={entry.title || 'Related project'}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/25 text-sm">
                          No image
                        </div>
                      )}
                    </div>
                    {entry.category && (
                      <p className="text-orange-500 text-xs font-subheading font-bold tracking-wide uppercase mb-1.5">
                        {entry.category}
                      </p>
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-subheading font-semibold text-base sm:text-lg leading-[1.35] truncate group-hover:text-orange-400 transition-colors">
                        {entry.title || 'Untitled project'}
                      </h3>
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-white/30 group-hover:text-orange-500 transition-colors"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Image lightbox with zoom */}
      <AnimatePresence>
        {lightboxOpen && activeImage && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-sm flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative z-20 flex items-center justify-between gap-3 px-4 sm:px-6 py-4">
              <p className="text-sm text-white/60">
                {activeIndex + 1} / {slides.length}
                <span className="mx-2 text-white/25">·</span>
                {Math.round(zoom * 100)}%
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={zoomOut}
                  disabled={zoom <= MIN_ZOOM}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/15 hover:bg-orange-500 hover:border-orange-500 disabled:opacity-35 disabled:hover:bg-white/10 disabled:hover:border-white/15 flex items-center justify-center transition-colors"
                  aria-label="Zoom out"
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  type="button"
                  onClick={zoomIn}
                  disabled={zoom >= MAX_ZOOM}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/15 hover:bg-orange-500 hover:border-orange-500 disabled:opacity-35 disabled:hover:bg-white/10 disabled:hover:border-white/15 flex items-center justify-center transition-colors"
                  aria-label="Zoom in"
                >
                  <ZoomIn size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom(1)}
                  className="hidden sm:inline-flex h-10 px-3 rounded-full bg-white/10 border border-white/15 hover:border-orange-500 text-xs font-medium transition-colors"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/15 hover:bg-orange-500 hover:border-orange-500 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div
              className="relative flex-1 overflow-auto"
              onWheel={(event) => {
                if (event.deltaY < 0) zoomIn()
                else zoomOut()
              }}
              onClick={closeLightbox}
            >
              <div className="min-h-full min-w-full flex items-center justify-center p-4">
                {slides.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        goPrev()
                      }}
                      className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/70 border border-white/15 hover:bg-orange-500 hover:border-orange-500 flex items-center justify-center transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        goNext()
                      }}
                      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/70 border border-white/15 hover:bg-orange-500 hover:border-orange-500 flex items-center justify-center transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}

                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={`${title} — zoomed`}
                  initial={{ opacity: 0.7, scale: 1 }}
                  animate={{ opacity: 1, scale: zoom }}
                  transition={{ duration: 0.2 }}
                  className="max-w-[90vw] max-h-[80vh] object-contain origin-center select-none"
                  style={{ cursor: zoom > 1 ? 'zoom-out' : 'zoom-in' }}
                  onClick={(event) => {
                    event.stopPropagation()
                    if (zoom >= MAX_ZOOM) setZoom(1)
                    else zoomIn()
                  }}
                  draggable={false}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PortfolioDetail
