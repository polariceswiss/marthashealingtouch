# Martha's Healing Touch — implementation notes

The active application is Next.js at src/app/page.tsx. Run npm run dev -- --port 3100 and open http://localhost:3100. The old preview.html is a historical draft, not the current application.

The hero MP4 is an 18-second camera move rendered from original AI editorial photography with FFmpeg. It is controlled by scroll, not autoplay, with a lightweight mobile encode and a still-image fallback. It is not generative live-action footage of a treatment. The original transparent business logo is used unchanged, with CSS clips separating its fairy and lettering for the entrance.

## Integrations

Chat: Next.js same-origin API -> local n8n protected webhook -> scoped keyword retrieval -> existing DeepSeek credential -> response. n8n workflow ID marthaWellnessChat01; export integrations/n8n/martha-concierge.json. Server secrets are in ignored .env.local. No browser credential exposure. The in-memory edge rate limit must be replaced with shared storage if deploying multiple server instances. n8n and Docker must remain running for local chat.

Voice: separate Martha's Healing Touch AI (MHT AI) agent in ElevenLabs, knowledge base, English Jessica voice and Spanish Daniela voice, automatic language switch, no audio recording, seven-day transcript retention, daily/concurrency limits. Configuration lives in docs/elevenlabs-config.json. Do not overwrite NOVA agents. No live voice conversation has been verified unless recorded in QA.md.

Booking: Booksy widget 1351188. The customer completes booking in Booksy; the assistant has no calendar API or appointment write access. The page includes an external fallback for embedding restrictions. Email actions open a selected provider's composer; they do not send automatically. The callback form requires the visitor to review the exact spelling and phone number, then prepares a WhatsApp message to the business number. WhatsApp opens on the visitor's device and sends only after they press Send; `integrations/n8n/martha-leads.json` is the protected handoff workflow for a future owner-notification or email node.

## Source accuracy

Source https://marthashealingtouch.com/ and /services/ reviewed September 11, 2026. Original fonts observed in computed CSS: Raleway and droid-serif. Existing prototype fabricated reviews, aggregate rating, result figures and generic links; these are not rendered by the rebuilt page. The live site's conflicting opening hours remain unconfirmed. The callback flow uses the public business phone as the default WhatsApp destination; set `MARTHA_WHATSAPP_OWNER_PHONE` in production if that WhatsApp number differs.

## Assets

Original logo: https://marthashealingtouch.com/wp-content/uploads/2021/07/LOGO-MARTHAHT-5.png
Hero and facial: built-in imagegen, illustrative and not actual staff/premises. Prompt direction: natural editorial photography, emerald/pine shadows, warm natural skin, champagne light, facial massage, anatomically correct hands, no roses/bottles/text/logos. Hero places the face right and negative space left; facial is a vertical composition. Massage: original business website image https://marthashealingtouch.com/wp-content/uploads/2024/04/woman-getting-back-massage-from-masseur-scaled.jpg (third generated asset failed; existing business asset reused).

## Deployment boundary

No public production deployment or domain change performed. localhost integrations are not remotely accessible. Production requires a hosting environment capable of Next.js server routes, server-side environment variables and an HTTPS-accessible authenticated n8n endpoint. Voice domain allowlist currently includes localhost, 127.0.0.1 and the business's existing domain.
