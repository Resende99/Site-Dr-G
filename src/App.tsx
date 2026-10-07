import { useEffect } from 'react'
import Faq from './components/Faq'
import FaceAtlas from './components/FaceAtlas'
import Nav from './components/Nav'
import { processSteps, services, whatsappHref } from './data'

export default function App() {
  usePointerField()
  useReveal()

  return (
    <div className="shell">
      <div className="pointer-field" aria-hidden />
      <Nav />

      <main id="topo">
        <section className="sec hero">
          <div className="hero-copy">
            <p className="hero-eyebrow">Cirurgiã-dentista · Harmonização Orofacial</p>
            <h1>
              Presença e <em>naturalidade</em> em cada procedimento
            </h1>
            <p>
              Botox, preenchedores e bioestimuladores planejados com técnica e cuidado — em
              Destêrro de Entre Rios, MG.
            </p>
            <div className="hero-actions">
              <a className="btn" href="#atlas">
                Montar meu briefing
              </a>
              <a className="btn ghost" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                Agendar no WhatsApp
              </a>
            </div>
          </div>
          <figure className="hero-img">
            <img src="/images/hero.jpg" alt="Retrato da Dra. Geovana Diniz" />
            <figcaption>Geovana Diniz · HOF</figcaption>
          </figure>
        </section>

        <div className="credbar">
          <div>
            <b>HOF</b>
            <span>Harmonização</span>
          </div>
          <div>
            <b>CD</b>
            <span>Cirurgiã-dentista</span>
          </div>
          <div>
            <b>MG</b>
            <span>Destêrro de Entre Rios</span>
          </div>
        </div>

        <section className="sec about" id="sobre">
          <p className="eyebrow">Sobre</p>
          <h2>Técnica com escuta</h2>
          <div className="about-row">
            <div className="about-photo">
              <img src="/images/about.jpg" alt="Dra. Geovana Diniz" />
            </div>
            <p>
              Atendimento individualizado, sempre a partir de um diagnóstico do seu rosto —
              resultado natural, sem padrão pronto.
            </p>
          </div>
        </section>

        <FaceAtlas />

        <section className="sec services" id="especialidades">
          <p className="eyebrow">Especialidades</p>
          <h2>O que eu ofereço</h2>
          <div className="services-grid">
            {services.map((service) => (
              <article className="scard" key={service.id}>
                <h3>{service.name}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="sec process">
          <p className="eyebrow">O atendimento</p>
          <h2>Um cuidado pensado para você</h2>
          <div className="process-grid">
            {processSteps.map((step) => (
              <article className="process-step" key={step.n}>
                <strong>{step.n}</strong>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="sec gallery">
          <p className="eyebrow">No consultório</p>
          <h2>Bastidores do cuidado</h2>
          <div className="gallery-grid">
            <div>
              <img src="/images/hero.jpg" alt="Ambiente e presença clínica" />
            </div>
            <div>
              <img src="/images/gallery-2.jpg" alt="Detalhe do atendimento" />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=85"
                alt="Consultório preparado para avaliação"
              />
            </div>
          </div>
        </section>

        <Faq />

        <section className="sec location" id="local">
          <div>
            <p className="eyebrow">Localização</p>
            <h2>Atendimento em Destêrro de Entre Rios</h2>
            <p>Consultório particular, com hora marcada.</p>
            <p className="addr">Destêrro de Entre Rios — MG</p>
          </div>
          <a className="btn ghost" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
            Falar no WhatsApp
          </a>
        </section>

        <section className="sec final">
          <h2>Vamos planejar o seu sorriso?</h2>
          <a className="btn" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
            Chamar no WhatsApp
          </a>
        </section>
      </main>

      <footer className="foot">
        <div>Geovana Diniz — Cirurgiã-dentista</div>
        <div>Destêrro de Entre Rios, MG</div>
      </footer>
    </div>
  )
}

function usePointerField() {
  useEffect(() => {
    const root = document.documentElement
    const move = (event: PointerEvent) => {
      root.style.setProperty('--mx', `${event.clientX}px`)
      root.style.setProperty('--my', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])
}

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('.about, .atlas, .services, .process, .gallery, .faq, .location, .final')
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          obs.unobserve(entry.target)
        })
      },
      { threshold: 0.12 },
    )
    items.forEach((item) => {
      item.classList.add('reveal')
      observer.observe(item)
    })
    return () => observer.disconnect()
  }, [])
}
