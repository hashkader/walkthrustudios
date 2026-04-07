'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/lib/gsap'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const split1Ref = useRef<InstanceType<typeof SplitText> | null>(null)
  const split2Ref = useRef<InstanceType<typeof SplitText> | null>(null)

  useGSAP(
    () => {
      const dc = gsap.delayedCall(0.1, () => {
        // Eyebrow: 0.2s delay
        gsap.from(eyebrowRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
        })

        // Headline SplitText: 0.4s delay, chars cascade
        split1Ref.current = new SplitText(line1Ref.current!, { type: 'chars' })
        split2Ref.current = new SplitText(line2Ref.current!, { type: 'chars' })

        // Reveal headline wrapper now that SplitText has taken control
        gsap.set(headlineRef.current, { visibility: 'visible' })

        const allChars = [
          ...split1Ref.current.chars,
          ...split2Ref.current.chars,
        ]

        gsap.from(allChars, {
          opacity: 0,
          y: 60,
          rotateX: 40,
          transformPerspective: 600,
          transformOrigin: 'center bottom',
          stagger: 0.018,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.4,
        })

        // Subtext: 1.4s delay
        gsap.from(subtextRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 1.4,
          ease: 'power3.out',
        })

        // CTA: 1.8s delay
        gsap.from(ctaRef.current, {
          opacity: 0,
          duration: 0.8,
          delay: 1.8,
          ease: 'power3.out',
        })

        // Scroll indicator: 2.0s delay
        gsap.from(scrollIndicatorRef.current, {
          opacity: 0,
          duration: 0.8,
          delay: 2.0,
          ease: 'power3.out',
        })

        // Dot loop animation
        gsap.to(dotRef.current, {
          y: 50,
          opacity: 0,
          duration: 1.5,
          ease: 'power2.in',
          repeat: -1,
          delay: 2.5,
        })
      })

      return () => {
        dc.kill()
        split1Ref.current?.revert()
        split2Ref.current?.revert()
      }
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="site-hero"
      style={{
        position: 'relative',
        height: '100svh',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      {/* SVG grain filter definition */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0 }}
      >
        <defs>
          <filter id="hero-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="greyNoise"
            />
            <feBlend in="SourceGraphic" in2="greyNoise" mode="overlay" />
          </filter>
        </defs>
      </svg>

      {/* Grain overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          filter: 'url(#hero-grain)',
          opacity: 0.035,
          pointerEvents: 'none',
        }}
      />

      {/* Radial gold glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 50% at 50% 85%, rgba(201,169,110,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Atmospheric grid lines */}
      {/* <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.04)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '70%',
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.04)',
          pointerEvents: 'none',
        }}
      /> */}

      {/* Main content — bottom of viewport */}
      <div
        className="hero-content"
        style={{
          position: 'absolute',
          top: '58%',
          left: 0,
          right: 0,
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      >
        {/* Eyebrow label */}
        <p
          ref={eyebrowRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: 'var(--color-accent)',
            marginBottom: '1.25rem',
          }}
        >
          Virtual Property Tours
        </p>

        {/* Headline */}
        <div
          ref={headlineRef}
          className="hero-headline"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            color: 'var(--color-text-primary)',
            lineHeight: 1.05,
            perspective: '600px',
            visibility: 'hidden',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <span
              ref={line1Ref}
              style={{ fontStyle: 'italic', display: 'block' }}
            >
              Every property
            </span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span
              ref={line2Ref}
              style={{ fontStyle: 'normal', display: 'block' }}
            >
              tells a story.
            </span>
          </div>
        </div>

        {/* Subtext */}
        <p
          ref={subtextRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            fontWeight: 300,
            color: 'var(--color-text-secondary)',
            marginTop: '1.5rem',
            lineHeight: 1.8,
          }}
        >
          We put your clients inside it.
        </p>

        {/* CTA button */}
        <a ref={ctaRef} href="#contact" className="hero-cta">
          Request a Tour →
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: '0.75rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--color-accent)',
            opacity: 0.5,
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            position: 'relative',
            width: '1px',
            height: '60px',
            backgroundColor: 'var(--color-accent)',
            opacity: 0.4,
          }}
        >
          <div
            ref={dotRef}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
