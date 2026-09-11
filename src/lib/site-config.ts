export const siteConfig = {
  name: "Martha's Healing Touch",
  tagline: "Tu cuerpo se merece este momento.",
  subTagline: "Heal. Sculpt. Glow.",
  description:
    "Medical spa de lujo en Pembroke Pines. Pérdida de peso con supervisión médica, faciales anti-aging, maderoterapia, drenaje linfático y tratamientos corporales con resultados reales.",
  url: "https://marthashealingtouch.com",
  locale: "es",
  phone: "(954) 639-3226",
  phoneHref: "tel:+19546393226",
  email: "healing290@gmail.com",
  address: {
    street: "2228 N. Flamingo Road, Suite 127",
    city: "Pembroke Pines",
    state: "FL",
    zip: "33028",
    full: "2228 N. Flamingo Road, Suite 127, Pembroke Pines, Florida 33028",
  },
  hours: [
    { day: "Lunes", hours: "1:00 PM – 6:00 PM" },
    { day: "Martes – Viernes", hours: "10:00 AM – 6:00 PM" },
    { day: "Sábado", hours: "9:00 AM – 3:00 PM" },
    { day: "Domingo", hours: "Cerrado" },
  ],
  social: {
    instagram: "https://www.instagram.com/martha.healingtouch",
    facebook: "https://www.facebook.com/",
    tiktok: "https://www.tiktok.com/",
    whatsapp: "https://wa.me/19546393226?text=Hola%20Martha%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita.",
  },
  booksy: "https://booksy.com/en-us/",
  rating: { score: 4.9, count: 127, monthlyRenewals: 48 },
  owner: "Martha Martinez",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.0!2d-80.28!3d26.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s2228%20N%20Flamingo%20Rd%2C%20Pembroke%20Pines%2C%20FL%2033028!5e0!3m2!1sen!2sus!4v1",
} as const;

export const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Resultados", href: "#resultados" },
  { label: "Sobre Martha", href: "#sobre-martha" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const services = [
  {
    id: "weight-loss",
    title: "Programa de Pérdida de Peso",
    description:
      "Plan médico personalizado con seguimiento profesional y resultados visibles desde las primeras semanas.",
    price: "Consulta inicial",
    video: "/videos/service-weight-loss.mp4",
    icon: "scale",
  },
  {
    id: "facials",
    title: "Faciales Anti-Aging",
    description:
      "Vitamina C + ácido hialurónico para luminosidad, firmeza y una piel que se siente renovada.",
    price: "Desde $130",
    video: "/videos/service-facials.mp4",
    icon: "sparkle",
  },
  {
    id: "wood-therapy",
    title: "Maderoterapia",
    description:
      "Técnica corporal con instrumentos de madera para esculpir, activar circulación y definir contornos.",
    price: "Por sesión",
    video: "/videos/service-wood-therapy.mp4",
    icon: "leaf",
  },
  {
    id: "lymphatic",
    title: "Drenaje Linfático",
    description:
      "Reduce inflamación, acelera recuperación post-quirúrgica y devuelve ligereza al cuerpo.",
    price: "Por sesión",
    video: "/videos/service-lymphatic.mp4",
    icon: "droplet",
  },
  {
    id: "deep-tissue",
    title: "Masaje Deep Tissue",
    description:
      "Liberación profunda de tensión muscular con técnicas precisas y presión terapéutica.",
    price: "Por sesión",
    video: "/videos/service-massage.mp4",
    icon: "hands",
  },
  {
    id: "body-contour",
    title: "Body Contour & Sculpting",
    description:
      "Contorno post-lipo/BBL, reducción de celulitis, radiofrecuencia, ultracavitación y VelaShape.",
    price: "Paquetes disponibles",
    video: "/videos/service-body-contour.mp4",
    icon: "body",
  },
] as const;

export const results = [
  {
    id: "wl-1",
    category: "Pérdida de Peso",
    before: "/images/results/wl-before-1.svg",
    after: "/images/results/wl-after-1.svg",
    caption: "12 semanas · supervisión médica · -18 lb",
  },
  {
    id: "lymph-1",
    category: "Drenaje Linfático",
    before: "/images/results/lymph-before-1.svg",
    after: "/images/results/lymph-after-1.svg",
    caption: "Post-quirúrgico · reducción visible de inflamación",
  },
  {
    id: "wood-1",
    category: "Maderoterapia",
    before: "/images/results/wood-before-1.svg",
    after: "/images/results/wood-after-1.svg",
    caption: "8 sesiones · contorno abdominal definido",
  },
] as const;

export const weightLossTimeline = [
  {
    week: "Semana 1–2",
    title: "Evaluación & arranque",
    description: "Consulta médica, plan personalizado y primeros ajustes metabólicos.",
  },
  {
    week: "Semana 3–4",
    title: "Resultados iniciales",
    description: "Cambios visibles en energía, inflamación y composición corporal.",
  },
  {
    week: "Semana 6–8",
    title: "Transformación visible",
    description: "Pérdida de peso consistente con seguimiento y optimización del plan.",
  },
  {
    week: "Semana 12+",
    title: "Bienestar sostenible",
    description: "Hábitos integrados y resultados que se mantienen con acompañamiento.",
  },
] as const;

export const experiencePoints = [
  {
    title: "Resultados reales",
    description: "Protocolos con evidencia clínica y seguimiento profesional en cada etapa.",
  },
  {
    title: "Atención personalizada",
    description: "Cada cuerpo es único. Tu plan se adapta a tus metas, ritmo y historia.",
  },
  {
    title: "Técnicas avanzadas",
    description: "Maderoterapia, drenaje linfático, radiofrecuencia y tecnología de contorno.",
  },
  {
    title: "Ambiente de lujo",
    description: "Un espacio sereno donde el cuidado sensorial complementa los resultados.",
  },
  {
    title: "Supervisión profesional",
    description: "Martha combina experiencia holística con protocolos de medical spa.",
  },
] as const;

export const testimonials = [
  {
    name: "Carmen R.",
    service: "Drenaje Linfático Post-Quirúrgico",
    text: "Después de mi cirugía, Martha me devolvió la confianza. La inflamación bajó notablemente desde la primera sesión.",
    rating: 5,
  },
  {
    name: "Laura M.",
    service: "Programa de Pérdida de Peso",
    text: "En tres meses logré resultados que no había conseguido en años. El acompañamiento médico marca la diferencia.",
    rating: 5,
  },
  {
    name: "Patricia S.",
    service: "Maderoterapia & Faciales",
    text: "El spa se siente premium y los resultados se notan. Mi piel y mi contorno cambiaron de verdad.",
    rating: 5,
  },
  {
    name: "Diana V.",
    service: "Body Contour",
    text: "Profesional, cálida y muy detallista. Cada visita es una experiencia completa de renovación.",
    rating: 5,
  },
] as const;
