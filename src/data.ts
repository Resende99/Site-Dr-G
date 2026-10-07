export const WHATSAPP = '553183029013'

export const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#atlas', label: 'Atlas' },
  { href: '#especialidades', label: 'Serviços' },
  { href: '#local', label: 'Contato' },
] as const

export const services = [
  {
    id: 'botox',
    name: 'Botox',
    text: 'Toxina botulínica para rugas finas, sorriso gengival e bruxismo.',
  },
  {
    id: 'preenchedores',
    name: 'Preenchedores',
    text: 'Lábios, rinomodelação, queixo, mandíbula, malar e olheiras.',
  },
  {
    id: 'bioestimuladores',
    name: 'Bioestimuladores',
    text: 'Estímulo de colágeno para face e pescoço.',
  },
] as const

export type ServiceId = (typeof services)[number]['id']

export type Zone = {
  id: string
  name: string
  concern: string
  hint: string
  services: ServiceId[]
}

export const zones: Zone[] = [
  {
    id: 'testa',
    name: 'Testa e glabela',
    concern: 'Rugas finas e linhas de expressão',
    hint: 'Movimento repetido da testa e do olhar franzido.',
    services: ['botox'],
  },
  {
    id: 'olhos',
    name: 'Olhar',
    concern: 'Olheiras e cansaço ao redor dos olhos',
    hint: 'Volume e sombra na região periocular.',
    services: ['preenchedores'],
  },
  {
    id: 'nariz',
    name: 'Nariz',
    concern: 'Rinomodelação',
    hint: 'Harmonia do dorso e da ponta, sem cirurgia.',
    services: ['preenchedores'],
  },
  {
    id: 'labios',
    name: 'Lábios e sorriso',
    concern: 'Lábios e sorriso gengival',
    hint: 'Contorno, volume e equilíbrio do sorriso.',
    services: ['botox', 'preenchedores'],
  },
  {
    id: 'malar',
    name: 'Malar e midface',
    concern: 'Perda de firmeza e projeção',
    hint: 'Sustentação da face média e estímulo de colágeno.',
    services: ['preenchedores', 'bioestimuladores'],
  },
  {
    id: 'mandibula',
    name: 'Mandíbula e queixo',
    concern: 'Contorno, bruxismo e papada',
    hint: 'Linha mandibular, queixo e tensão muscular.',
    services: ['botox', 'preenchedores'],
  },
  {
    id: 'pescoco',
    name: 'Pescoço',
    concern: 'Firmeza do pescoço',
    hint: 'Qualidade da pele abaixo da linha da mandíbula.',
    services: ['bioestimuladores'],
  },
]

export const processSteps = [
  {
    n: '01',
    title: 'Escuta e avaliação',
    text: 'Conversamos sobre suas queixas, desejos e rotina antes de qualquer indicação.',
  },
  {
    n: '02',
    title: 'Plano individual',
    text: 'Definimos juntos o que faz sentido para o seu rosto, com naturalidade e segurança.',
  },
  {
    n: '03',
    title: 'Acompanhamento',
    text: 'O cuidado continua depois do procedimento, respeitando o tempo do seu resultado.',
  },
]

export const faqs = [
  {
    q: 'Como funciona a primeira consulta?',
    a: 'A primeira conversa é dedicada a entender seus objetivos, avaliar seu rosto e explicar as possibilidades de tratamento.',
  },
  {
    q: 'O resultado fica artificial?',
    a: 'O planejamento prioriza equilíbrio e naturalidade. Cada indicação é feita de acordo com suas características, sem um padrão pronto.',
  },
  {
    q: 'O atlas facial substitui a avaliação?',
    a: 'Não. Ele só organiza o que você quer conversar. O diagnóstico e o plano são feitos no consultório, com a Dra. Geovana.',
  },
  {
    q: 'Como agendo meu atendimento?',
    a: 'É só chamar pelo WhatsApp. A equipe informa os horários disponíveis e orienta você sobre os próximos passos.',
  },
]

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${WHATSAPP}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export function briefingMessage(selected: Zone[], preference: 'natural' | 'definido') {
  const topics = selected.map((z) => z.concern).join(', ')
  const tone =
    preference === 'natural'
      ? 'Prefiro um resultado natural, sem aspecto artificial.'
      : 'Gostaria de conversar sobre um contorno um pouco mais marcado, ainda com equilíbrio.'
  if (!selected.length) {
    return `Olá, Dra. Geovana. Gostaria de agendar uma avaliação de harmonização orofacial. ${tone}`
  }
  return `Olá, Dra. Geovana. Gostaria de agendar uma avaliação. Quero conversar sobre: ${topics}. ${tone}`
}
