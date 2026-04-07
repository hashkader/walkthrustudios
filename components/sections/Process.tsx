'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'

const steps = [
  {
    number: '01',
    label: 'Consultation',
    name: 'We learn\nyour property.',
    description:
      'A short briefing with your agent or developer. We map the space, note the key areas, and confirm what the tour needs to cover.',
  },
  {
    number: '02',
    label: 'Production',
    name: 'We capture\neverything.',
    description:
      'We arrive on-site and capture the full property — all rooms, transitions, and detail areas needed for the tour.',
  },
  {
    number: '03',
    label: 'Processing',
    name: 'We build\nthe tour.',
    description:
      '48-hour turnaround. Full post-production, spatial stitching, and interactive hotspot mapping. Delivered as an embeddable link.',
  },
  {
    number: '04',
    label: 'Delivery',
    name: 'You go\nlive.',
    description:
      'One link. Works on every device, every browser. Embed it in your listing, send it to buyers, or present it in a pitch \u2014 it\u2019s yours.',
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headlineWrapRef = useRef<HTMLDivElement>(null)
  const headline1Ref = useRef<HTMLHeadingElement>(null)
  const headline2Ref = useRef<HTMLHeadingElement>(null)
  const connectingLineRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null))
  const ghostNumberRefs = useRef<(HTMLSpanElement | null)[]>(Array(4).fill(null))

  const split1Ref = useRef<InstanceType<typeof SplitText> | null>(null)
  const split2Ref = useRef<InstanceType<typeof SplitText> | null>(null)

  useGSAP(
    () => {
      // 1. Vertical label
      if (window.innerWidth <= 768) {
        gsap.set(labelRef.current, { display: 'none' })
      } else {
        gsap.from(labelRef.current, {
          opacity: 0,
          x: -20,
          duration: 1,
          ease: 'power3.out',
          immediateRender: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        })
      }

      // 2. Headline SplitText words
      split1Ref.current = new SplitText(headline1Ref.current!, { type: 'words' })
      split2Ref.current = new SplitText(headline2Ref.current!, { type: 'words' })

      const headlineST = ScrollTrigger.create({
        trigger: headlineWrapRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.set(headlineWrapRef.current, { visibility: 'visible' })
          gsap.from(
            [...split1Ref.current!.words, ...split2Ref.current!.words],
            {
              opacity: 0,
              y: 30,
              stagger: 0.08,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.15,
            }
          )
        },
      })

      // 3. Connecting line scaleY
      gsap.from(connectingLineRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: true,
        scrollTrigger: {
          trigger: connectingLineRef.current,
          start: 'top 70%',
        },
      })

      // 4. Steps entrance — stagger across the 2x2 grid
      gsap.from(stepRefs.current, {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        immediateRender: true,
        scrollTrigger: {
          trigger: connectingLineRef.current,
          start: 'top 85%',
        },
      })

      // 5. Ghost numbers fade in with stagger (same trigger as steps)
      gsap.from(ghostNumberRefs.current, {
        opacity: 0,
        duration: 1.4,
        ease: 'power2.out',
        stagger: 0.2,
        immediateRender: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      })

      return () => {
        headlineST.kill()
        split1Ref.current?.revert()
        split2Ref.current?.revert()
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="process"
      ref={sectionRef}
      className="site-process"
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-bg-secondary)',
      }}
    >
      {/* Vertical label */}
      <span
        ref={labelRef}
        className="section-label"
        style={{
          position: 'absolute',
          left: 'max(1.5rem, 4vw)',
          top: '14vw',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-text-tertiary)',
          transform: 'rotate(-90deg)',
          transformOrigin: 'left top',
          whiteSpace: 'nowrap',
        }}
      >
        03 - Process
      </span>

      {/* Section header */}
      <div
        className="process-header"
        style={{
          marginRight: '2rem',
        }}
      >
        <div
          ref={headlineWrapRef}
          style={{ visibility: 'hidden', overflow: 'hidden' }}
        >
          <h2
            ref={headline1Ref}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 300,
              fontStyle: 'normal',
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
            }}
          >
            How it
          </h2>
          <h2
            ref={headline2Ref}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
            }}
          >
            works.
          </h2>
        </div>
      </div>

      {/* Connecting line */}
      <div
        ref={connectingLineRef}
        className="connecting-line"
        style={{
          backgroundColor: 'rgba(255,255,255,0.06)',
          margin: '0 auto',
        }}
      />

      {/* Steps grid */}
      <div
        className="steps-grid"
        style={{
          display: 'grid',
          gap: '1px',
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.1)',
        }}
      >
        {steps.map((step, i) => (
          <div
            key={step.number}
            ref={(el) => {
              stepRefs.current[i] = el
            }}
            className="process-step"
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Ghost number — decorative, sits behind bottom content */}
            <span
              ref={(el) => {
                ghostNumberRefs.current[i] = el
              }}
              aria-hidden="true"
              className="step-ghost-number"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5rem, 8vw, 7rem)',
                fontWeight: 300,
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {step.number}
            </span>

            {/* Bottom: label, name, description */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.25em',
                  color: 'var(--color-accent)',
                  marginBottom: '0.75rem',
                }}
              >
                {step.label}
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 300,
                  color: 'var(--color-text-primary)',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                  whiteSpace: 'pre-line',
                }}
              >
                {step.name}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 300,
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.9,
                  maxWidth: '340px',
                }}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
