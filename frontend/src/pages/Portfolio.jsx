import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Clock3,
  Grid2x2,
  Layout,
  Megaphone,
  Palette,
  Search,
  Share2,
  Smile,
} from 'lucide-react'
import { api } from '../lib/api'

const PAGE_SIZE = 6

const FILTERS = [
  { id: 'All', label: 'All Works', icon: Grid2x2 },
  { id: 'Branding', label: 'Branding', icon: Palette },
  { id: 'Web Design', label: 'Web Design', icon: Layout },
  { id: 'Digital Marketing', label: 'Digital Marketing', icon: Megaphone },
  { id: 'Social Media', label: 'Social Media', icon: Share2 },
  { id: 'SEO', label: 'SEO', icon: Search },
]

const STATS = [
  { icon: Briefcase, label: '120+ Projects Completed' },
  { icon: Smile, label: '80+ Happy Clients' },
  { icon: Clock3, label: '5+ Years Experience' },
  { icon: CheckCircle2, label: '98% Client Satisfaction' },
]

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=80'

function Portfolio() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError('')
        const data = await api.getPortfolio()
        if (!cancelled) setItems(Array.isArray(data) ? data : [])
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load portfolio')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const safeItems = Array.isArray(items) ? items : []

  const filters = useMemo(() => {
    const known = new Set(FILTERS.map((f) => f.id))
    const extras = [...new Set(safeItems.map((item) => item.category).filter(Boolean))]
      .filter((category) => !known.has(category))
      .map((category) => ({ id: category, label: category, icon: Briefcase }))
    return [...FILTERS, ...extras]
  }, [safeItems])

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return safeItems
    return safeItems.filter(
      (item) => item.category?.toLowerCase() === activeCategory.toLowerCase()
    )
  }, [safeItems, activeCategory])

  const visibleItems = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const onFilter = (category) => {
    setActiveCategory(category)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="h-16 bg-black" aria-hidden="true" />

      <section className="relative min-h-[calc(78vh-4rem)] md:min-h-[calc(88vh-4rem)] overflow-hidden flex items-end md:items-center pb-16 md:pb-20 pt-10 md:pt-14">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/40" />
          <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[55vw] max-w-[720px] aspect-square pointer-events-none">
            <div className="absolute inset-[12%] rounded-full border-[18px] md:border-[28px] border-orange-500/70 shadow-[0_0_80px_rgba(249,115,22,0.45)]" />
            <div className="absolute inset-[22%] rounded-full border border-orange-400/30" />
            <div className="absolute inset-0 rounded-full bg-orange-500/10 blur-3xl" />
          </div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-center md:text-left mx-auto md:mx-0"
          >
            <p className="text-orange-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Our Portfolio
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-5">
              Work That Drives{' '}
              <span className="text-orange-500">Real Results.</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-10 max-w-xl mx-auto md:mx-0">
              Explore campaigns, brands, and digital experiences crafted by
              Digital Buddies to help businesses grow with clarity and impact.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
            >
              {STATS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-2.5 text-left">
                  <Icon
                    className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 shrink-0 mt-0.5"
                    strokeWidth={1.75}
                  />
                  <span className="text-xs sm:text-sm text-gray-200 leading-snug">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2.5 overflow-x-auto pb-2 mb-8 md:mb-12 md:flex-wrap md:overflow-visible md:justify-center [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {filters.map(({ id, label, icon: Icon }) => {
              const active = activeCategory === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onFilter(id)}
                  className={`inline-flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shrink-0 ${
                    active
                      ? 'bg-orange-500 text-white shadow-[0_0_24px_rgba(249,115,22,0.35)]'
                      : 'bg-[#161616] text-gray-300 hover:text-white hover:bg-[#1f1f1f] border border-white/5'
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              )
            })}
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-3 animate-pulse">
                  <div className="aspect-[4/3] rounded-2xl bg-[#161616]" />
                  <div className="h-3 w-24 rounded bg-[#161616]" />
                  <div className="h-5 w-40 rounded bg-[#161616]" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-20">
              <p className="text-red-400 mb-2">{error}</p>
              <p className="text-gray-500 text-sm">
                Make sure the backend is running on port 5000.
              </p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No portfolio work yet. Upload projects from the admin panel.
            </div>
          )}

          {!loading && !error && visibleItems.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
                {visibleItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: (index % 6) * 0.06, duration: 0.45 }}
                  >
                    <Link to={`/portfolio/${item.id}`} className="group block text-left">
                      <div className="overflow-hidden rounded-2xl mb-4 bg-[#161616]">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title || 'Portfolio project'}
                            className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full aspect-[4/3] flex items-center justify-center text-gray-500 text-sm">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          {item.category && (
                            <p className="text-orange-500 text-xs sm:text-sm font-medium mb-1 truncate">
                              {item.category}
                            </p>
                          )}
                          <h2 className="text-lg sm:text-xl font-semibold truncate group-hover:text-orange-400 transition-colors">
                            {item.title || 'Untitled project'}
                          </h2>
                        </div>
                        <span className="shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-orange-400">
                          <ArrowUpRight size={18} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-12 md:mt-16">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                    className="w-full sm:w-auto min-w-[280px] px-10 py-3.5 rounded-xl border border-orange-500 font-medium transition-colors duration-300 bg-orange-500 text-white sm:bg-transparent sm:text-orange-500 hover:bg-orange-500 hover:text-white"
                  >
                    View More Projects
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Portfolio
