import { useMemo, useState, type ReactNode } from 'react'
import { briefingMessage, services, whatsappHref, zones } from '../data'

type Preference = 'natural' | 'definido'

export default function FaceAtlas() {
  const [selectedIds, setSelectedIds] = useState<string[]>(['labios'])
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [preference, setPreference] = useState<Preference>('natural')

  const selected = useMemo(
    () => zones.filter((zone) => selectedIds.includes(zone.id)),
    [selectedIds],
  )

  const suggested = useMemo(() => {
    const ids = new Set(selected.flatMap((zone) => zone.services))
    return services.filter((service) => ids.has(service.id))
  }, [selected])

  const activeId = hoverId ?? selectedIds.at(-1) ?? null
  const activeZone = zones.find((zone) => zone.id === activeId) ?? zones[0]
  const message = briefingMessage(selected, preference)

  function toggle(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <section className="sec atlas" id="atlas">
      <div className="atlas-copy">
        <p className="eyebrow">Atlas facial</p>
        <h2>Toque no que te incomoda. O briefing já nasce pronto.</h2>
        <p className="lede">
          Um mapa para organizar a conversa — não é diagnóstico. Você escolhe as regiões,
          eu levo isso para a avaliação com a Dra. Geovana.
        </p>
        <div className="pref">
          <span>Tom do resultado</span>
          <div className="pref-pills">
            <button
              type="button"
              className={preference === 'natural' ? 'is-on' : undefined}
              onClick={() => setPreference('natural')}
            >
              Natural
            </button>
            <button
              type="button"
              className={preference === 'definido' ? 'is-on' : undefined}
              onClick={() => setPreference('definido')}
            >
              Mais definido
            </button>
          </div>
        </div>
      </div>

      <div className="atlas-stage">
        <FaceMap
          selectedIds={selectedIds}
          hoverId={hoverId}
          onHover={setHoverId}
          onToggle={toggle}
        />
        <aside className="atlas-panel">
          <p className="atlas-kicker">{activeZone.name}</p>
          <h3>{activeZone.concern}</h3>
          <p>{activeZone.hint}</p>
          <ul className="atlas-picks">
            {zones.map((zone) => (
              <li key={zone.id}>
                <button
                  type="button"
                  className={selectedIds.includes(zone.id) ? 'is-on' : undefined}
                  onMouseEnter={() => setHoverId(zone.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onFocus={() => setHoverId(zone.id)}
                  onBlur={() => setHoverId(null)}
                  onClick={() => toggle(zone.id)}
                >
                  {zone.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="atlas-suggest">
            <span>Para conversar na avaliação</span>
            {suggested.length ? (
              <strong>{suggested.map((item) => item.name).join(' · ')}</strong>
            ) : (
              <strong>Escolha uma região no mapa</strong>
            )}
          </div>
          <a className="btn" href={whatsappHref(message)} target="_blank" rel="noopener noreferrer">
            Levar briefing no WhatsApp
          </a>
        </aside>
      </div>
    </section>
  )
}

type MapProps = {
  selectedIds: string[]
  hoverId: string | null
  onHover: (id: string | null) => void
  onToggle: (id: string) => void
}

function FaceMap({ selectedIds, hoverId, onHover, onToggle }: MapProps) {
  return (
    <svg
      className="face-svg"
      viewBox="0 0 280 360"
      role="img"
      aria-label="Mapa interativo do rosto. Selecione regiões para montar o briefing."
    >
      <defs>
        <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F7F1E6" />
          <stop offset="100%" stopColor="#E8DFD0" />
        </linearGradient>
      </defs>
      <ellipse cx="140" cy="178" rx="88" ry="118" fill="url(#skin)" stroke="#C9C2B2" />
      <path d="M92 268 C110 318 170 318 188 268" fill="none" stroke="#C9C2B2" strokeWidth="1.2" />
      <ellipse cx="140" cy="318" rx="42" ry="22" fill="#EFE8DA" stroke="#C9C2B2" />

      {hotspots.map((spot) => {
        const on = selectedIds.includes(spot.id) || hoverId === spot.id
        return (
          <g
            key={spot.id}
            className={on ? 'hotspot is-on' : 'hotspot'}
            onMouseEnter={() => onHover(spot.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onToggle(spot.id)}
            role="button"
            tabIndex={0}
            aria-pressed={selectedIds.includes(spot.id)}
            aria-label={spot.label}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onToggle(spot.id)
              }
            }}
          >
            {spot.node}
          </g>
        )
      })}
    </svg>
  )
}

const hotspots: { id: string; label: string; node: ReactNode }[] = [
  {
    id: 'testa',
    label: 'Testa e glabela',
    node: <ellipse cx="140" cy="92" rx="58" ry="28" />,
  },
  {
    id: 'olhos',
    label: 'Olhar',
    node: (
      <>
        <ellipse cx="108" cy="148" rx="24" ry="14" />
        <ellipse cx="172" cy="148" rx="24" ry="14" />
      </>
    ),
  },
  {
    id: 'nariz',
    label: 'Nariz',
    node: <ellipse cx="140" cy="186" rx="16" ry="26" />,
  },
  {
    id: 'labios',
    label: 'Lábios e sorriso',
    node: <ellipse cx="140" cy="232" rx="28" ry="14" />,
  },
  {
    id: 'malar',
    label: 'Malar e midface',
    node: (
      <>
        <ellipse cx="86" cy="188" rx="18" ry="28" />
        <ellipse cx="194" cy="188" rx="18" ry="28" />
      </>
    ),
  },
  {
    id: 'mandibula',
    label: 'Mandíbula e queixo',
    node: <path d="M78 228 C88 272 192 272 202 228 C186 258 94 258 78 228Z" />,
  },
  {
    id: 'pescoco',
    label: 'Pescoço',
    node: <ellipse cx="140" cy="318" rx="34" ry="16" />,
  },
]
