import { useEffect, useState } from 'react'
import { navLinks, whatsappHref } from '../data'

export default function Nav() {
  const { active, open, setOpen } = useNavState()

  return (
    <header className="nav">
      <a className="brand" href="#topo">
        <img src="/images/brand.png" alt="" />
        <span>Geovana Diniz</span>
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
      <nav className={open ? 'is-open' : undefined}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={active === link.href ? 'is-active' : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a className="btn nav-cta" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
          Agendar
        </a>
      </nav>
    </header>
  )
}

function useNavState() {
  const [active, setActive] = useState('#topo')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return { active, open, setOpen }
}
