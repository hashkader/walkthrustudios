'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'

const contactDetails = [
  { label: 'Email', value: 'walkthrustudios@gmail.com' },
  { label: 'Based In', value: 'Johannesburg, South Africa' },
  { label: 'Response Time', value: 'Within 24 hours' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headlineWrapRef = useRef<HTMLDivElement>(null)
  const headline1Ref = useRef<HTMLHeadingElement>(null)
  const headline2Ref = useRef<HTMLHeadingElement>(null)
  const headline3Ref = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const ghostRef = useRef<HTMLSpanElement>(null)
  const detailRefs = useRef<(HTMLDivElement | null)[]>(Array(3).fill(null))

  const split1Ref = useRef<InstanceType<typeof SplitText> | null>(null)
  const split2Ref = useRef<InstanceType<typeof SplitText> | null>(null)
  const split3Ref = useRef<InstanceType<typeof SplitText> | null>(null)

  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [size, setSize] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      if (inputRef.current) {
        inputRef.current.style.borderBottomColor = 'rgba(255,80,80,0.6)'
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.style.borderBottomColor = ''
          }
        }, 1000)
      }
      return
    }
    setSubmitted(true)
  }

  const propertyTypes = ['Residential', 'Commercial']

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

      // 2. Headline SplitText words across all three lines
      split1Ref.current = new SplitText(headline1Ref.current!, { type: 'words' })
      split2Ref.current = new SplitText(headline2Ref.current!, { type: 'words' })
      split3Ref.current = new SplitText(headline3Ref.current!, { type: 'words' })

      const headlineST = ScrollTrigger.create({
        trigger: labelRef.current,
        start: 'top 60%',
        once: true,        
        onEnter: () => {
          gsap.set(headlineWrapRef.current, { visibility: 'visible' })
          gsap.from(
            [
              ...split1Ref.current!.words,
              ...split2Ref.current!.words,
              ...split3Ref.current!.words,
            ],
            {
              opacity: 0,
              y: 30,
              stagger: 0.07,
              duration: 0.9,
              ease: 'power3.out',
              delay: 0.2,
            }
          )
        },
      })

      // 3. Body copy
      gsap.from(bodyRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: true,
        scrollTrigger: {
          trigger: bodyRef.current,
          start: 'top 85%',
        },
      })

      // 4. Form row
      gsap.from(formRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        immediateRender: true,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
        },
      })

      // 5. Contact detail items
      gsap.from(detailRefs.current, {
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: true,
        scrollTrigger: {
          trigger: detailRefs.current[0],
          start: 'top 70%',
        },
      })

      // 6. Ghost "BEGIN" text
      gsap.from(ghostRef.current, {
        opacity: 0,
        x: 60,
        duration: 1.5,
        ease: 'power2.out',
        immediateRender: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      return () => {
        headlineST.kill()
        split1Ref.current?.revert()
        split2Ref.current?.revert()
        split3Ref.current?.revert()
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="site-contact"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)',
          top: '50%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Ghost "BEGIN" text */}
      <span
        ref={ghostRef}
        aria-hidden="true"
        className="ghost-text"
        style={{
          position: 'absolute',
          bottom: '-2rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.025)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.02em',
        }}
      >
        BEGIN
      </span>

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
        04 - Let's Work Together
      </span>

      {/* Content */}
      <div
        className="contact-content"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '700px',
        }}
      >
        {/* Headline */}
        <div
          ref={headlineWrapRef}
          style={{ visibility: 'hidden', overflow: 'hidden', marginTop: '1.5rem' }}
        >
          <h2
            ref={headline1Ref}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              fontWeight: 300,
              fontStyle: 'normal',
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
            }}
          >
            Ready to show
          </h2>
          <h2
            ref={headline2Ref}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
            }}
          >
            your property
          </h2>
          <h2
            ref={headline3Ref}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              fontWeight: 300,
              fontStyle: 'normal',
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
            }}
          >
            in its best light?
          </h2>
        </div>

        {/* Body copy */}
        <p
          ref={bodyRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            fontWeight: 300,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.9,
            maxWidth: '480px',
            marginTop: '2rem',
          }}
        >
          Tell us about your property and we'll get back to you within 24
          hours with a production proposal.
        </p>

        {/* Form */}
        <div ref={formRef} style={{ marginTop: '3.5rem' }}>
          {submitted ? (
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontStyle: 'italic',
                  color: 'var(--color-accent)',
                }}
              >
                We'll be in touch.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: 'var(--color-text-tertiary)',
                  marginTop: '0.5rem',
                }}
              >
                Check your inbox within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                {/* Email — full width */}
                <div className="form-field form-field--full">
                  <label className="form-label">Email</label>
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="contact-input"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '0',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      fontWeight: 300,
                      color: 'var(--color-text-primary)',
                      width: '100%',
                    }}
                  />
                </div>

                {/* Location */}
                <div className="form-field">
                  <label className="form-label">Property Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Sandton, Johannesburg"
                    className="contact-input"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '0',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      fontWeight: 300,
                      color: 'var(--color-text-primary)',
                      width: '100%',
                      maxWidth: 'none',
                      flex: 'none',
                    }}
                  />
                </div>

                {/* Size */}
                <div className="form-field">
                  <label className="form-label">Property Size</label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="e.g. 450 sqm / 5 bed"
                    className="contact-input"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '0',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      fontWeight: 300,
                      color: 'var(--color-text-primary)',
                      width: '100%',
                      maxWidth: 'none',
                      flex: 'none',
                    }}
                  />
                </div>

                {/* Property Type — full width */}
                <div className="form-field form-field--full">
                  <label className="form-label">Property Type</label>
                  <div className="property-type-group">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`type-option${propertyType === type ? ' type-option--active' : ''}`}
                        onClick={() => setPropertyType(type === propertyType ? '' : type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <button type="submit" className="contact-submit">
                  Request a Tour →
                </button>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 300,
                    color: 'var(--color-text-tertiary)',
                    margin: 0,
                  }}
                >
                  No commitment required. We'll respond within 24 hours.
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Contact details row */}
        <div
          className="contact-details"
          style={{ marginTop: '4rem' }}
        >
          {contactDetails.map((item, i) => (
            <div
              key={item.label}
              ref={(el) => {
                detailRefs.current[i] = el
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: '0.4rem',
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: 300,
                  color: 'var(--color-text-secondary)',
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
