# Martha's Healing Touch — Design Spec & Production Guide

> Medical Spa · Pembroke Pines, FL · Rediseño premium cinematográfico

---

## 1. Prompts Higgsfield (Cinema Studio / DOP / Seedance)

### Hero Video (8–15 s loop · 4K · 24fps)

**Prompt principal:**
```
Cinematic luxury medical spa hero video, slow motion wooden therapy tools (maderoterapia) gliding over glowing healthy skin with oil, golden hour soft diffused light, close-up of lymphatic drainage massage hands, ethereal soft steam rising, elegant woman relaxing in serene high-end spa environment, ultra realistic skin texture and reflections, subtle fabric movement, shallow depth of field, subtle film grain, emotional transformative atmosphere, warm ivory and sage color grading, 4K, slow dolly and subtle orbit camera movements, seamless loop ending
```

**Negative prompt:**
```
cartoon, CGI look, plastic skin, oversaturated, harsh flash, clinical hospital, text overlay, watermark, shaky cam, fast cuts, low resolution, blurry faces
```

**Settings recomendados:** Aspect 16:9 · Duration 12s · Seedance/DOP · Camera: slow dolly + subtle orbit · Color: warm golden hour

---

### Service Micro-Videos (3–4 s cada uno · loop · vertical-friendly crop)

#### Weight Loss Program
```
Cinematic close-up medical spa consultation, professional hands reviewing wellness chart, soft sage green and ivory tones, warm gold accent lighting, confident woman mid-30s, luxury spa interior, shallow depth of field, slow motion, 4K, seamless loop
```

#### Faciales Anti-Aging
```
Luxury facial treatment cinematic macro, vitamin C serum dropper on glowing skin, esthetician hands applying hyaluronic acid, soft steam, golden hour spa light, ultra realistic skin texture, slow motion, ivory and rose tones, 4K loop
```

#### Wood Therapy / Maderoterapia
```
Extreme close-up maderoterapia wooden rollers gliding on oiled skin, rhythmic sculpting motion, warm oil reflections, sage and gold color grade, medical spa luxury, slow motion, shallow DOF, 4K seamless loop
```

#### Lymphatic Drainage
```
Cinematic lymphatic drainage massage, gentle hands on abdomen and legs, soft diffused light, serene spa atmosphere, visible relaxation, ivory tones, slow motion, professional technique, 4K loop
```

**Export:** WebM (VP9) + MP4 (H.264) · Desktop hero ≤ 4MB · Mobile hero ≤ 1.5MB · Service clips ≤ 800KB

---

## 2. Paleta de Colores & Tipografía

### Colores (Hex)

| Token | Hex | Uso |
|-------|-----|-----|
| Ivory 50 | `#FFFEF9` | Fondos principales, texto sobre oscuro |
| Ivory 100 | `#FAF8F5` | Background body |
| Ivory 200 | `#F5F1EB` | Cards, secciones alternas |
| Sage 100 | `#D4DDD0` | Bordes suaves, fondos secundarios |
| Sage 300 | `#A8B5A0` | Acentos naturales |
| Sage 500 | `#8FA088` | Hover, iconografía |
| Sage 700 | `#6B7F63` | CTA backgrounds, profundidad |
| Sage 900 | `#4A5A44` | Gradientes oscuros |
| Gold 200 | `#E8D5A3` | Highlights, labels |
| Gold 400 | `#C9A962` | Acentos premium, estrellas |
| Gold 600 | `#B8943F` | Botones primarios |
| Gold 800 | `#96782E` | Hover botones |
| Charcoal 800 | `#2C2C2C` | Texto principal |
| Charcoal 900 | `#1A1A1A` | Hero overlay, footer |
| Rose 400 | `#C4A5A5` | Acentos faciales / feminidad |
| Eucalyptus 500 | `#8BA888` | Acentos wellness |

### Tipografía

| Rol | Fuente | Pesos | Fallback |
|-----|--------|-------|----------|
| Títulos (H1–H3) | **Cormorant Garamond** | 300, 400, 500, 600 | Georgia, serif |
| Cuerpo / UI | **DM Sans** | 400, 500, 600, 700 | system-ui, sans-serif |

**Alternativas premium:** Playfair Display + Outfit · o Libre Baskerville + Inter

---

## 3. Wireframe / Estructura de Componentes

```
app/
├── layout.tsx          → Fonts, SEO, Schema LocalBusiness
├── page.tsx            → Composición de todas las secciones
└── globals.css         → Design tokens Tailwind v4

components/
├── layout/
│   ├── Header.tsx      → Fixed transparent → solid on scroll, mobile menu
│   └── Footer.tsx      → Contacto, horarios, mapa, redes
├── hero/
│   ├── HeroSection.tsx → Video bg, overlay, CTAs, rating, parallax, pause
│   ├── SplitText.tsx   → Animación palabra por palabra
│   └── CustomCursor.tsx→ Glow cursor (desktop only)
├── sections/
│   ├── ServicesSection.tsx
│   ├── ServiceCard.tsx → 3D tilt + video on hover
│   ├── ResultsSection.tsx → Before/after carousel
│   ├── WeightLossSection.tsx → Timeline + CTA
│   ├── AboutMarthaSection.tsx
│   ├── ExperienceSection.tsx
│   ├── TestimonialsSection.tsx
│   └── FinalCTASection.tsx
└── ui/
    └── Button.tsx

lib/
├── site-config.ts      → Copy, links, servicios, testimonios
├── design-tokens.ts
└── utils.ts
```

### Secciones (orden de scroll)

| # | Sección | ID | Componente |
|---|---------|-----|--------------|
| 1 | Header sticky | — | `Header` |
| 2 | Hero cinematográfico | `#inicio` | `HeroSection` |
| 3 | Servicios | `#servicios` | `ServicesSection` |
| 4 | Resultados reales | `#resultados` | `ResultsSection` |
| 5 | Weight Loss destacado | — | `WeightLossSection` |
| 6 | Sobre Martha | `#sobre-martha` | `AboutMarthaSection` |
| 7 | Por qué elegirnos | — | `ExperienceSection` |
| 8 | Testimonios | — | `TestimonialsSection` |
| 9 | CTA final | — | `FinalCTASection` |
| 10 | Footer + mapa | `#contacto` | `Footer` |

---

## 4. Hero Section — Implementado

Código en `src/components/hero/HeroSection.tsx`

**Features incluidos:**
- Video full-bleed con WebM + MP4 fallback
- Poster frame para carga rápida
- Overlay gradiente cinematográfico
- Split text animation (Framer Motion)
- Parallax + fade on scroll (Framer + GSAP ScrollTrigger)
- CTAs: Booksy + Resultados
- Rating badge 4.9
- Botón pausar/reproducir (WCAG)
- Versión mobile/desktop de video
- Scroll indicator animado

---

## 5. Copy Completo (Español)

### Hero
- **Tagline:** Tu cuerpo se merece este momento.
- **Sub-tagline:** Heal. Sculpt. Glow.
- **Descripción:** Medical spa de lujo en Pembroke Pines. Resultados reales con supervisión profesional, técnicas avanzadas y una experiencia que renueva cuerpo y mente.
- **CTA 1:** Reservar ahora
- **CTA 2:** Ver resultados reales
- **Social proof:** 4.9 · 127+ reseñas · 48 personas se sintieron renovadas este mes

### Servicios — Intro
**Tratamientos que transforman**
Desde pérdida de peso con supervisión médica hasta maderoterapia y drenaje linfático. Cada protocolo combina precisión clínica con una experiencia sensorial de spa de lujo.

*(Copy de cada servicio en `src/lib/site-config.ts`)*

### Resultados
**Transformaciones que se ven y se sienten**
Cada resultado refleja un protocolo personalizado. Sin promesas vacías: seguimiento profesional, constancia y técnicas que funcionan.

### Weight Loss
**Pérdida de peso con supervisión médica**
Un plan integral diseñado para resultados rápidos y sostenibles. Martha acompaña cada fase con evaluación profesional, ajustes personalizados y el respaldo de un medical spa de confianza.

### Sobre Martha
**Cuidado profesional con alma**
Martha Martinez fundó Martha's Healing Touch con una convicción clara: cada persona merece resultados reales en un ambiente donde se sienta escuchada, cuidada y segura.

### Experiencia
**Por qué elegirnos** — 5 pilares: Resultados reales, Atención personalizada, Técnicas avanzadas, Ambiente de lujo, Supervisión profesional.

### Testimonios
**Lo que dicen quienes confiaron en nosotros** — 4 testimonios en carrusel.

### CTA Final
**Tu momento de transformación empieza aquí**
Reserva tu cita hoy y descubre cómo se siente un medical spa donde los resultados son reales y la experiencia, inolvidable.

---

## 6. Assets Necesarios

### Videos (Higgsfield → `public/videos/`)

| Archivo | Spec | Prioridad |
|---------|------|-----------|
| `hero-desktop.mp4` | 1920×1080, ≤4MB, 10–15s loop | P0 |
| `hero-desktop.webm` | VP9, mismo contenido | P0 |
| `hero-mobile.mp4` | 720×1280 o 1080×1920, ≤1.5MB | P0 |
| `hero-mobile.webm` | VP9 mobile | P0 |
| `service-weight-loss.mp4` | 3–4s loop | P1 |
| `service-facials.mp4` | 3–4s loop | P1 |
| `service-wood-therapy.mp4` | 3–4s loop | P1 |
| `service-lymphatic.mp4` | 3–4s loop | P1 |
| `service-massage.mp4` | 3–4s loop | P2 |
| `service-body-contour.mp4` | 3–4s loop | P2 |

### Imágenes (`public/images/`)

| Archivo | Spec | Prioridad |
|---------|------|-----------|
| `hero-poster.jpg` | Frame del hero, 1920×1080, WebP/JPG optimizado | P0 |
| `martha-portrait.jpg` | Foto profesional, 800×1000, fondo neutro | P0 |
| `results/*-before.jpg` | Before/after reales (con consentimiento) | P0 |
| `results/*-after.jpg` | Mínimo 3 pares | P0 |
| `service-placeholder.jpg` | Fallback cards | P2 |
| `og-image.jpg` | 1200×630 Open Graph | P1 |
| `favicon.ico` + `apple-touch-icon.png` | Branding | P1 |

### Integraciones

| Asset | Acción |
|-------|--------|
| URL Booksy real | Actualizar `siteConfig.booksy` |
| Google Maps embed | Reemplazar URL en `siteConfig.mapsEmbed` |
| Facebook / TikTok URLs | Actualizar en `siteConfig.social` |
| Reseñas Google/Birdeye | Reemplazar testimonios placeholder |

---

## 7. Implementación Paso a Paso

### Fase 1 — Setup (✅ hecho)
1. `npx create-next-app` con TypeScript + Tailwind
2. Instalar `framer-motion` + `gsap`
3. Configurar fonts (Cormorant + DM Sans)
4. Design tokens en `globals.css`

### Fase 2 — Contenido visual
1. Generar videos en Higgsfield con prompts de §1
2. Comprimir con FFmpeg:
   ```bash
   ffmpeg -i hero-raw.mp4 -c:v libx264 -crf 28 -preset slow -an hero-desktop.mp4
   ffmpeg -i hero-raw.mp4 -c:v libvpx-vp9 -crf 35 -an hero-desktop.webm
   ```
3. Extraer poster: `ffmpeg -i hero-desktop.mp4 -ss 00:00:02 -vframes 1 hero-poster.jpg`
4. Fotos profesionales de Martha + before/after con consentimiento firmado

### Fase 3 — Integraciones
1. Pegar URL Booksy real en `src/lib/site-config.ts`
2. Embed Google Maps desde Google Maps → Share → Embed
3. Verificar WhatsApp link: `wa.me/19546393226`
4. Conectar dominio en Vercel

### Fase 4 — SEO & Performance
1. Schema LocalBusiness ya en `layout.tsx`
2. Añadir `sitemap.ts` + `robots.ts`
3. Optimizar imágenes con `next/image` + WebP
4. Lighthouse audit → target 90+ mobile
5. `prefers-reduced-motion` respetado en CSS

### Fase 5 — Deploy
```powershell
cd marthas-healing-touch
npm run build
npm run start
# Deploy: vercel --prod
```

### Fase 6 — Post-launch
1. Google Business Profile link
2. Meta Pixel / GA4 (opcional)
3. A/B test CTA "Reservar" vs "Agendar consulta"
4. Newsletter (Mailchimp/ConvertKit) en footer

---

## Comandos de desarrollo

```powershell
cd marthas-healing-touch
npm run dev      # http://localhost:3000
npm run build    # Verificar producción
npm run lint     # ESLint
```

---

*Generado para Martha's Healing Touch · Pembroke Pines, FL*
