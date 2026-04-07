const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer
      className="site-footer"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '2.5rem max(4rem, 8vw)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Left: wordmark + copyright */}
      <div className="footer-left">
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--color-text-tertiary)',
          }}
        >
          Walkthru Studios
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 300,
            color: '#3a3530',
            marginTop: '0.4rem',
          }}
        >
          &copy; 2025 Walkthru Studios. All rights reserved.
        </p>
      </div>

      {/* Center: tagline */}
      <div className="footer-center">
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.9rem',
            fontStyle: 'italic',
            color: 'var(--color-text-tertiary)',
          }}
        >
          Step inside before you arrive.
        </p>
      </div>

      {/* Right: nav links */}
      <nav className="footer-right">
        {footerLinks.map((link) => (
          <a key={link.label} href={link.href} className="footer-link">
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
