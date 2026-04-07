'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'

const properties = [
  {
    number: '01',
    type: 'Residential',
    name: 'The Aldgate Penthouse',
    price: 'R\u00a024,500,000',
    location: 'Cape Town, Atlantic Seaboard',
    size: '340\u00a0m\u00b2',
    gradient: 'linear-gradient(135deg, #1a1410 0%, #0d0d0d 40%, #1c1510 100%)',
  },
  {
    number: '02',
    type: 'Residential',
    name: 'Sunset Villa',
    price: 'R\u00a018,200,000',
    location: 'Cape Town, Camps Bay',
    size: '280\u00a0m\u00b2',
    gradient: 'linear-gradient(135deg, #0d1014 0%, #080808 40%, #101418 100%)',
  },
  {
    number: '03',
    type: 'Commercial',
    name: 'The Foundry Office',
    price: 'R\u00a045,000,000',
    location: 'Cape Town, De Waterkant',
    size: '1,200\u00a0m\u00b2',
    gradient: 'linear-gradient(135deg, #14100d 0%, #0d0d0d 40%, #181410 100%)',
  },
  {
    number: '04',
    type: 'Pre-Sales',
    name: 'One Portside',
    price: 'R\u00a08,900,000',
    location: 'Cape Town, City Bowl',
    size: '95\u00a0m\u00b2',
    gradient: 'linear-gradient(135deg, #0d1010 0%, #080808 40%, #0f1414 100%)',
  },
  {
    number: '05',
    type: 'Residential',
    name: 'Constantia Estate',
    price: 'R\u00a032,000,000',
    location: 'Cape Town, Constantia',
    size: '620\u00a0m\u00b2',
    gradient: 'linear-gradient(135deg, #12100e 0%, #0d0d0d 40%, #16130f 100%)',
  },
]

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headlineWrapRef = useRef<HTMLDivElement>(null)
  const headline1Ref = useRef<HTMLHeadingElement>(null)
  const headline2Ref = useRef<HTMLHeadingElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null))
  const imageInnerRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null))

  const split1Ref = useRef<InstanceType<typeof SplitText> | null>(null)
  const split2Ref = useRef<InstanceType<typeof SplitText> | null>(null)

  // Drag-to-scroll — useEffect because this is DOM event handling, not animation
  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const onMouseDown = (e: MouseEvent) => {
      isDown = true
      el.style.cursor = 'grabbing'
      startX = e.pageX - el.offsetLeft
      scrollLeft = el.scrollLeft
    }

    const onMouseLeave = () => {
      isDown = false
      el.style.cursor = 'grab'
    }

    const onMouseUp = () => {
      isDown = false
      el.style.cursor = 'grab'
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      const walk = (x - startX) * 1.2
      el.scrollLeft = scrollLeft - walk
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mousemove', onMouseMove)

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

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
        start: 'top 70%',
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

      // 3. Cards entrance from right
      gsap.from(cardRefs.current, {
        opacity: 0,
        x: 80,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        immediateRender: true,
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: 'top 70%',
        },
      })

      // 4. Parallax on inner image divs (vertical scroll scrub)
      imageInnerRefs.current.forEach((el) => {
        if (!el) return
        gsap.to(el, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        })
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
      ref={sectionRef}
      className="site-showcase"
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-bg-primary)',
        paddingBottom: 0,
      }}
    >
      {/* Vertical label — matches 01/02 treatment */}
      <span
        ref={labelRef}
        className="section-label"
        style={{
          position: 'absolute',
          left: 'max(1.5rem, 4vw)',
          top: '8vw',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-text-tertiary)',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          whiteSpace: 'nowrap',
        }}
      >
        03 - Featured Properties
      </span>

      {/* Section header row */}
      <div
        className="showcase-header"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        {/* Left: headline */}
        <div>
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
                fontStyle: 'italic',
                color: 'var(--color-text-primary)',
                lineHeight: 1.1,
              }}
            >
              Selected
            </h2>
            <h2
              ref={headline2Ref}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 300,
                fontStyle: 'normal',
                color: 'var(--color-text-primary)',
                lineHeight: 1.1,
              }}
            >
              work.
            </h2>
          </div>
        </div>

        {/* Right: drag instruction */}
        <span
          className="drag-label"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--color-text-tertiary)',
            paddingBottom: '0.5rem',
          }}
        >
          Drag to Explore → 
        </span>
      </div>

      {/* Horizontal scroll gallery */}
      <div
        ref={scrollContainerRef}
        className="gallery-scroll"
        style={{
          overflowX: 'scroll',
          overflowY: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          gap: '1.5rem',
          cursor: 'grab',
        }}
      >
        {properties.map((prop, i) => (
          <div
            key={prop.number}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className="showcase-card"
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Image zone — receives CSS scale on card hover */}
            <div
              className="image-zone"
              style={{
                height: '70%',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Inner gradient div — parallax target, extra height for travel room */}
              <div
                ref={(el) => {
                  imageInnerRefs.current[i] = el
                }}
                style={{
                  position: 'absolute',
                  top: '-30px',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: prop.gradient,
                }}
              >
                {/* Bottom fade overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 50%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Property type tag — top left */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    left: '1.25rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'rgba(8,8,8,0.7)',
                    padding: '6px 12px',
                  }}
                >
                  {prop.type}
                </div>

                {/* Large property number — bottom right */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    bottom: '-1rem',
                    right: '1.5rem',
                    fontFamily: 'var(--font-display)',
                    fontSize: '8rem',
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.08)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  {prop.number}
                </span>
              </div>
            </div>

            {/* Card info area — bottom 30% */}
            <div
              style={{
                height: '30%',
                backgroundColor: '#0f0f0f',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Row 1: name + price */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 300,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {prop.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--color-accent)',
                    letterSpacing: '0.1em',
                    whiteSpace: 'nowrap',
                    marginLeft: '1rem',
                  }}
                >
                  {prop.price}
                </span>
              </div>

              {/* Row 2: location + size */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginTop: '0.5rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    fontWeight: 300,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {prop.location}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--color-text-tertiary)',
                    whiteSpace: 'nowrap',
                    marginLeft: '1rem',
                  }}
                >
                  {prop.size}
                </span>
              </div>

              {/* Row 3: view tour link */}
              <a href="#" className="tour-link">
                View Tour → 
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
