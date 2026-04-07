'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const line1Ref = useRef<HTMLHeadingElement>(null)
  const line2Ref = useRef<HTMLHeadingElement>(null)
  const line1WrapRef = useRef<HTMLDivElement>(null)
  const line2WrapRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const stat1NumRef = useRef<HTMLSpanElement>(null)
  const stat2NumRef = useRef<HTMLSpanElement>(null)
  const stat3NumRef = useRef<HTMLSpanElement>(null)
  const stat3Ref = useRef<HTMLDivElement>(null)
  const stat1Ref = useRef<HTMLDivElement>(null)
  const stat2Ref = useRef<HTMLDivElement>(null)

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
            trigger: labelRef.current,
            start: 'top 75%',
          },
        })
      }

      // 2 & 3. Headline lines via SplitText words
      split1Ref.current = new SplitText(line1Ref.current!, { type: 'words' })
      split2Ref.current = new SplitText(line2Ref.current!, { type: 'words' })

      // Visibility is revealed inside onEnter, not on mount, to prevent flash
      const st = ScrollTrigger.create({
        trigger: line1Ref.current,
        start: 'top 85%',

        onEnter: () => {
          gsap.set(line1WrapRef.current, { visibility: 'visible' })
          gsap.set(line2WrapRef.current, { visibility: 'visible' })
          gsap.from(split1Ref.current!.words, {
            opacity: 0,
            y: 30,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power3.out',
          })
          gsap.from(split2Ref.current!.words, {
            opacity: 0,
            y: 30,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.15,
          })
        },
        once: true,
      })

      // 4. Body paragraph
      gsap.from(bodyRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        immediateRender: true,
        scrollTrigger: {
          trigger: bodyRef.current,
          start: 'top 85%',
        },
      })

      // 5. Divider scaleX
      gsap.from(dividerRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: true,
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top 75%',
        },
      })

      // 6. Stats
      // Stat 1: count 0→340, display as "340+"
      const obj1 = { val: 0 }
      gsap.to(obj1, {
        val: 340,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          if (stat1NumRef.current) {
            stat1NumRef.current.textContent = `${Math.round(obj1.val)}+`
          }
        },
        scrollTrigger: {
          trigger: stat1Ref.current,
          start: 'top 85%',
        },
      })

      // Stat 2: count 0→100, display as "100%"
      const obj2 = { val: 0 }
      gsap.to(obj2, {
        val: 100,
        duration: 1.8,
        ease: 'power2.out',
        delay: 0.2,
        onUpdate: () => {
          if (stat2NumRef.current) {
            stat2NumRef.current.textContent = `${Math.round(obj2.val)}%`
          }
        },
        scrollTrigger: {
          trigger: stat2Ref.current,
          start: 'top 85%',
        },
      })

      // Stat 3: count 0→48, display as "48hr"
      const obj3 = { val: 0 }
      gsap.to(obj3, {
        val: 48,
        duration: 1.8,
        ease: 'power2.out',
        delay: 0.4,
        onUpdate: () => {
          if (stat3NumRef.current) {
            stat3NumRef.current.textContent = `${Math.round(obj3.val)}hr`
          }
        },
        scrollTrigger: {
          trigger: stat3Ref.current,
          start: 'top 85%',
        },
      })

      return () => {
        st.kill()
        split1Ref.current?.revert()
        split2Ref.current?.revert()
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="site-intro"
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      {/* Vertical label */}
      <span
        ref={labelRef}
        className="section-label"
        style={{
          position: 'absolute',
          left: 'max(1.5rem, 4vw)',
          top: '18vw',
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
        01 — Approach
      </span>

      {/* Main content block */}
      <div
        className="intro-content"
        style={{
          maxWidth: '900px',
          marginRight: '2rem',
        }}
      >
        {/* Headline line 1 */}
        <div
          ref={line1WrapRef}
          style={{ visibility: 'hidden', overflow: 'hidden', marginBottom: '0.25rem' }}
        >
          <p
            ref={line1Ref}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 300,
              color: 'var(--color-text-primary)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            We don&rsquo;t photograph properties.
          </p>
        </div>

        {/* Headline line 2 */}
        <div
          ref={line2WrapRef}
          style={{ visibility: 'hidden', overflow: 'hidden', marginBottom: '2.5rem' }}
        >
          <p
            ref={line2Ref}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-text-primary)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            We document them.
          </p>
        </div>

        {/* Body paragraph */}
        <p
          ref={bodyRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            fontWeight: 300,
            color: 'var(--color-text-secondary)',
            maxWidth: '520px',
            lineHeight: 1.9,
          }}
        >
          Every tour we produce is a considered piece of visual work — built
          for the buyer who needs to feel a space before they commit to it.
        </p>

        {/* Divider */}
        <div
          ref={dividerRef}
          style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            marginTop: '3rem',
          }}
        />

        {/* Stats row */}
        <div
          className="stats-row"
          style={{ marginTop: '4rem' }}
        >
          {/* <div ref={stat1Ref}>
            <span
              ref={stat1NumRef}
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                fontWeight: 300,
                color: 'var(--color-accent)',
                lineHeight: 1,
              }}
            >
              0+
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--color-text-tertiary)',
                marginTop: '0.25rem',
              }}
            >
              Tours Delivered
            </span>
          </div> */}

          <div ref={stat2Ref}>
            <span
              ref={stat2NumRef}
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                fontWeight: 300,
                color: 'var(--color-accent)',
                lineHeight: 1,
              }}
            >
              0%
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--color-text-tertiary)',
                marginTop: '0.25rem',
              }}
            >
              Client Retention
            </span>
          </div>

          <div ref={stat3Ref}>
            <span
              ref={stat3NumRef}
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                fontWeight: 300,
                color: 'var(--color-accent)',
                lineHeight: 1,
              }}
            >
              0hr
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--color-text-tertiary)',
                marginTop: '0.25rem',
              }}
            >
              Turnaround Time
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}