'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: '80px top',
      onEnter: () =>
        gsap.to(navRef.current, {
          backgroundColor: 'rgba(8,8,8,0.92)',
          backdropFilter: 'blur(12px)',
          duration: 0.4,
          ease: 'power2.out',
        }),
      onLeaveBack: () =>
        gsap.to(navRef.current, {
          backgroundColor: 'transparent',
          backdropFilter: 'blur(0px)',
          duration: 0.4,
          ease: 'power2.out',
        }),
    })
  })

  return (
    <nav
      ref={navRef}
      className="site-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
        }}
      >
        Walkthru Studios
      </span>

      <div className="nav-links">
        <a href="#services" className="nav-link">
          Services
        </a>
        <a href="#contact" className="nav-cta">
          Request a Tour
        </a>
      </div>
    </nav>
  )
}
