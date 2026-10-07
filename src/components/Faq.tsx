import { useState } from 'react'
import { faqs } from '../data'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="sec faq">
      <p className="eyebrow">Dúvidas frequentes</p>
      <h2>Antes de marcar sua avaliação</h2>
      <div className="faq-list">
        {faqs.map((item, index) => {
          const isOpen = open === index
          return (
            <div className={isOpen ? 'faq-item is-open' : 'faq-item'} key={item.q}>
              <button
                className="faq-question"
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                {item.q}
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
