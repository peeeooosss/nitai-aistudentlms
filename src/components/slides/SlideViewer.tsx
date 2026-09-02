import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { generateSlidesFromMarkdown, type Slide } from '../../lib/slideGenerator'

interface SlideViewerProps {
  dayNumber: number
  title: string
  contentMarkdown: string
  phase: number
  phaseName: string
  compact?: boolean
}

export default function SlideViewer({
  dayNumber,
  title,
  contentMarkdown,
  phase,
  compact = false,
}: SlideViewerProps) {
  const slides = generateSlidesFromMarkdown(contentMarkdown, dayNumber, title, phase)
  const [current, setCurrent] = useState(0)

  const total = slides.length
  const progress = total > 0 ? ((current + 1) / total) * 100 : 0

  const goTo = useCallback(
    (n: number) => {
      if (n < 0 || n >= total || n === current) return
      setCurrent(n)
    },
    [current, total]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        goTo(current + 1)
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goTo(current - 1)
      }
      if (e.key === 'Home') goTo(0)
      if (e.key === 'End') goTo(total - 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current, total, goTo])

  if (slides.length === 0) return null

  const slide = slides[current]

  const accent = slide.accentColor === 'cyan' ? '#06b6d4' : '#f59e0b'

  const heightClass = compact ? 'h-[500px]' : 'min-h-[600px] h-[calc(100vh-280px)]'

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-white/[0.08] ${heightClass} flex flex-col`}
      style={{ background: '#0a0d14' }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] z-20 transition-all duration-500"
        style={{
          width: `${progress}%`,
          background: accent,
          boxShadow: `0 0 12px ${accent}`,
        }}
      />

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex-1 flex flex-col p-6 sm:p-8 lg:p-10 overflow-y-auto relative z-10"
        >
          {/* Slide marker */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="font-mono text-[11px] tracking-[0.25em] uppercase"
              style={{ color: accent }}
            >
              {slide.marker}
            </span>
            <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.15)' }} />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40">
              {slide.section}
            </span>
          </div>

          {/* Slide content */}
          <div className="flex-1 flex flex-col justify-center max-w-4xl">
            {slide.layout === 'title' && <TitleSlide slide={slide} accent={accent} />}
            {slide.layout === 'content' && <ContentSlide slide={slide} accent={accent} />}
            {slide.layout === 'code' && <CodeSlide slide={slide} accent={accent} />}
            {slide.layout === 'keypoints' && <KeypointsSlide slide={slide} accent={accent} />}
            {slide.layout === 'takeaways' && <TakeawaysSlide slide={slide} accent={accent} />}
            {slide.layout === 'wrapup' && <WrapupSlide slide={slide} accent={accent} />}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="relative z-20 flex items-center justify-between px-6 sm:px-8 pb-4 pt-2">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed font-mono text-xs tracking-wider uppercase"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? `w-6 h-1.5`
                  : i < current
                    ? 'w-1.5 h-1.5 bg-white/25'
                    : 'w-1.5 h-1.5 bg-white/10'
              }`}
              style={i === current ? { background: accent } : undefined}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(current + 1)}
          disabled={current === total - 1}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed font-mono text-xs tracking-wider uppercase"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.15em] text-white/25 z-20 pointer-events-none">
        <span style={{ color: accent }}>{String(current + 1).padStart(2, '0')}</span>
        {' / '}
        <span>{String(total).padStart(2, '0')}</span>
      </div>
    </div>
  )
}

/* ===== SLIDE LAYOUTS ===== */

function TitleSlide({
  slide,
  accent,
}: {
  slide: Slide
  accent: string
 }) {
  return (
    <div className="flex flex-col gap-6">
      <h1
        className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[0.95]"
        style={{ fontFamily: "'Inter', system-ui, sans-serif", color: '#e8e6e1' }}
      >
        {slide.title.split(' ').map((word, i) => {
          if (i === 1 || i === 2) {
            return (
              <span key={i} className="italic font-normal" style={{ color: accent }}>
                {word}{' '}
              </span>
            )
          }
          return word + ' '
        })}
      </h1>

      {slide.subtitle && (
        <p className="font-mono text-[12px] tracking-[0.2em] uppercase text-white/40 max-w-lg leading-relaxed">
          <span
            className="inline-block w-1.5 h-1.5 mr-2 rounded-full align-middle"
            style={{ background: accent }}
          />
          {slide.subtitle}
        </p>
      )}

      {slide.contentBlocks[0]?.items && (
        <div className="mt-4 space-y-2">
          {slide.contentBlocks[0].items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
              <span
                className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: accent }}
              />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-6 mt-auto pt-8">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 leading-loose">
          <strong className="text-white/50 font-medium">Session Goal</strong>
          <br />
          Understand and apply the core concepts of this module.
        </div>
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 leading-loose text-right ml-auto">
          <strong className="text-white/50 font-medium">Format</strong> · Lecture + Examples
          <br />
          <strong className="text-white/50 font-medium">Duration</strong> · ~15 min read
        </div>
      </div>
    </div>
  )
}

function ContentSlide({
  slide,
  accent,
}: {
  slide: Slide
  accent: string
 }) {
  return (
    <div className="flex flex-col gap-6">
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight"
        style={{ fontFamily: "'Inter', system-ui, sans-serif", color: '#e8e6e1' }}
      >
        {slide.title.split(' ').map((word, i) => {
          if (i === 0 || (slide.title.split(' ').length > 3 && i === 2)) {
            return (
              <span key={i} className="italic font-normal" style={{ color: accent }}>
                {word}{' '}
              </span>
            )
          }
          return word + ' '
        })}
      </h2>

      {slide.contentBlocks.map((block, i) => (
        <div key={i}>
          {block.type === 'paragraph' && (
            <p
              className="text-base leading-relaxed max-w-2xl"
              style={{ color: 'rgba(232,230,225,0.65)' }}
              dangerouslySetInnerHTML={{ __html: block.text || '' }}
            />
          )}
          {block.type === 'bullets' && (
            <div className="space-y-3">
              {(block.items || []).map((item, j) => (
                <div
                  key={j}
                  className="flex items-start gap-3 text-sm leading-relaxed"
                  style={{ color: 'rgba(232,230,225,0.6)' }}
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: accent }}
                  />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function CodeSlide({
  slide,
  accent,
}: {
  slide: Slide
  accent: string
 }) {
  const codeBlock = slide.contentBlocks.find(b => b.type === 'code')
  return (
    <div className="flex flex-col gap-6">
      <h2
        className="text-3xl sm:text-4xl font-light tracking-tight leading-tight"
        style={{ fontFamily: "'Inter', system-ui, sans-serif", color: '#e8e6e1' }}
      >
        {slide.title.split(' ').map((word, i) => {
          if (i === 0) {
            return (
              <span key={i} className="italic font-normal" style={{ color: accent }}>
                {word}{' '}
              </span>
            )
          }
          return word + ' '
        })}
      </h2>

      {codeBlock && (
        <div
          className="rounded-xl border overflow-hidden"
          style={{ background: '#141821', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2.5 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/25 ml-2">
              {codeBlock.language || 'code'}
            </span>
          </div>
          <pre className="p-5 overflow-x-auto">
            <code
              className="font-mono text-[13px] leading-relaxed text-white/60"
              dangerouslySetInnerHTML={{ __html: codeBlock.code || '' }}
            />
          </pre>
        </div>
      )}
    </div>
  )
}

function KeypointsSlide({
  slide,
  accent,
}: {
  slide: Slide
  accent: string
 }) {
  const gridBlock = slide.contentBlocks.find(b => b.type === 'grid')
  const cards = gridBlock?.cards || []

  return (
    <div className="flex flex-col gap-6">
      <h2
        className="text-3xl sm:text-4xl font-light tracking-tight leading-tight"
        style={{ fontFamily: "'Inter', system-ui, sans-serif", color: '#e8e6e1' }}
      >
        {slide.title.split(' ').map((word, i) => {
          if (i === 0) {
            return (
              <span key={i} className="italic font-normal" style={{ color: accent }}>
                {word}{' '}
              </span>
            )
          }
          return word + ' '
        })}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="p-5 rounded-xl border"
            style={{ background: '#141821', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div
              className="font-mono text-[9px] tracking-[0.25em] uppercase mb-3 flex items-center gap-2"
              style={{ color: accent }}
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: accent }}
              />
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3
              className="text-lg font-medium mb-2"
              style={{ color: '#e8e6e1' }}
            >
              {card.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,230,225,0.5)' }}>
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TakeawaysSlide({
  slide,
  accent,
}: {
  slide: Slide
  accent: string
 }) {
  return (
    <div className="flex flex-col gap-6">
      <h2
        className="text-3xl sm:text-4xl font-light tracking-tight leading-tight"
        style={{ fontFamily: "'Inter', system-ui, sans-serif", color: '#e8e6e1' }}
      >
        Why this matters{' '}
        <span className="italic font-normal" style={{ color: accent }}>
          for you.
        </span>
      </h2>

      <div className="space-y-3 mt-2">
        {(slide.contentBlocks[0]?.items || []).map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-4 rounded-xl border"
            style={{ background: '#141821', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold flex-shrink-0"
              style={{ background: accentDim(accent), color: accent }}
            >
              {i + 1}
            </span>
            <span
              className="text-sm leading-relaxed pt-1"
              style={{ color: 'rgba(232,230,225,0.65)' }}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function WrapupSlide({
  slide,
  accent,
}: {
  slide: Slide
  accent: string
 }) {
  return (
    <div className="flex flex-col gap-6">
      <h2
        className="text-3xl sm:text-4xl font-light tracking-tight leading-tight"
        style={{ fontFamily: "'Inter', system-ui, sans-serif", color: '#e8e6e1' }}
      >
        Practice{' '}
        <span className="italic font-normal" style={{ color: accent }}>
          Challenge.
        </span>
      </h2>

      <div className="space-y-2.5">
        {(slide.contentBlocks[0]?.items || []).map((item, i) => (
          <div key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'rgba(232,230,225,0.6)' }}>
            <span className="font-mono text-[11px] font-bold pt-0.5" style={{ color: accent }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </div>
        ))}
      </div>

      {slide.contentBlocks[1]?.type === 'callout' && (
        <div
          className="mt-4 p-4 rounded-xl border-l-2"
          style={{
            background: accentDim(accent),
            borderLeftColor: accent,
          }}
        >
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,230,225,0.7)' }}>
            {slide.contentBlocks[1].text}
          </p>
        </div>
      )}
    </div>
  )
}

function accentDim(color: string): string {
  if (color === '#06b6d4') return 'rgba(6,182,212,0.1)'
  return 'rgba(245,158,11,0.1)'
}
