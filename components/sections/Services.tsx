'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'

const cardData = [
  {
    number: '01',
    name: ['Residential', 'Tours'],
    description:
      'Immersive walkthroughs for homes, apartments, and penthouses. We capture volume, light, and atmosphere \u2014 not just rooms.',
    link: 'Explore residential → ',
  },
  {
    number: '02',
    name: ['Commercial', 'Spaces'],
    description:
      'Office buildings, retail environments, and hospitality venues. Tours built for decision-makers who value their time.',
    link: 'Explore commercial → ',
  },
  {
    number: '03',
    name: ['Pre-Sales', 'Staging (Coming Soon)'],
    description:
      'Virtual staging for off-plan developments. Help buyers commit to spaces that don\u2019t exist yet \u2014 with tours that feel entirely real.',
    link: 'Explore pre-sales → ',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headlineWrapRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const sweepRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const splitHeadRef = useRef<InstanceType<typeof SplitText> | null>(null)

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

      // 2. Headline words via SplitText
      splitHeadRef.current = new SplitText(headlineRef.current!, { type: 'words' })

      const headlineST = ScrollTrigger.create({
        trigger: headlineRef.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.set(headlineWrapRef.current, { visibility: 'visible' })
          gsap.from(splitHeadRef.current!.words, {
            opacity: 0,
            y: 30,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.15,
          })
        },
      })

      // 3. Cards entrance — stagger all three together
      gsap.from(cardRefs.current, {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        immediateRender: true,
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 95%',
        },
      })

      return () => {
        headlineST.kill()
        splitHeadRef.current?.revert()
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="services"
      ref={sectionRef}
      className="site-services"
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-bg-secondary)',
      }}
    >
      {/* Vertical label — matches Intro's "01 — APPROACH" treatment */}
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
        02 - Services
      </span>

      {/* Section header */}
      <div
        className="section-header"
        style={{
          marginRight: '2rem',
        }}
      >
        <div
          ref={headlineWrapRef}
          style={{ visibility: 'hidden', overflow: 'hidden' }}
        >
          <h2
            ref={headlineRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 300,
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
            }}
          >
            What we deliver.
          </h2>
        </div>
      </div>

      {/* Cards container — gap acts as 1px divider via container background */}
      <div
        ref={cardsContainerRef}
        className="cards-container"
        style={{
          display: 'flex',
          width: '100%',
          gap: '1px',
          backgroundColor: 'rgba(255,255,255,0.1)',
        }}
      >
        {cardData.map((card, i) => (
          <div
            key={card.number}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className="service-card"
            onMouseEnter={() =>
              sweepRefs.current[i]?.classList.add('card-sweep--active')
            }
            onMouseLeave={() =>
              sweepRefs.current[i]?.classList.remove('card-sweep--active')
            }
            style={{
              flex: 1,
              minWidth: 0,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
              {/* Diagonal light sweep */}
              <div
                ref={(el) => {
                  sweepRefs.current[i] = el
                }}
                className="card-sweep"
              />

              {/* Card content — sits above sweep */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1,
                }}
              >
                {/* Top: number, name, description */}
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      color: 'var(--color-text-tertiary)',
                    }}
                  >
                    {card.number}
                  </span>

                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)',
                      fontWeight: 300,
                      color: 'var(--color-text-primary)',
                      marginTop: '3rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {card.name.map((line) => (
                      <span key={line} style={{ display: 'block' }}>
                        {line}
                      </span>
                    ))}
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      fontWeight: 300,
                      color: 'var(--color-text-secondary)',
                      marginTop: '1.5rem',
                      lineHeight: 1.9,
                      maxWidth: '280px',
                    }}
                  >
                    {card.description}
                  </p>
                </div>

                {/* Bottom: divider + link */}
                <div>
                  <div
                    style={{
                      height: '1px',
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      marginBottom: '1.5rem',
                    }}
                  />
                  <a href="#" className="card-link">
                    {card.link}
                  </a>
                </div>
              </div>
            </div>
        ))}
      </div>
    </section>
  )
}
