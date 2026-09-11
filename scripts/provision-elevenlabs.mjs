import fs from "node:fs";
import { localEnv } from "./local-env.mjs";
import { conciergePrompt } from "../src/lib/spa.ts";

const env = localEnv();
const headers = { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" };
const statePath = "docs/elevenlabs-agent.json";
const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
const request = async (path, method = "GET", body) => {
  const response = await fetch(`https://api.elevenlabs.io/v1/${path}`, { method, headers, body: body && JSON.stringify(body), signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error(`ElevenLabs ${response.status}: ${await response.text()}`);
  return response.json();
};
const config = {
  name: "Martha's Healing Touch AI · EN / ES",
  tags: ["Martha", "Wellness", "Bilingual"],
  conversation_config: {
    agent: {
      language: "en",
      first_message: "Hi, I’m Martha’s Healing Touch AI, or MHT AI for short. We can chat in English or Spanish. What kind of care are you looking for today?",
      prompt: {
        prompt: `${conciergePrompt} For voice, use language_detection when the customer switches language. Never read a long booking URL aloud; direct the customer to Booksy or the spa phone.`,
        llm: "gemini-2.5-flash", temperature: 0.35, max_tokens: 350, timezone: "America/New_York",
        knowledge_base: [{ type: "text", name: "Verified spa knowledge", id: state.knowledgeBaseId, usage_mode: "auto" }],
        rag: { enabled: true, max_documents_length: 12000, max_retrieved_rag_chunks_count: 5 },
        built_in_tools: {
          language_detection: { type: "system", name: "language_detection", description: "Switch between English and Spanish when the customer does.", params: { system_tool_type: "language_detection", only_at_conversation_start: false } },
          end_call: { type: "system", name: "end_call", params: { system_tool_type: "end_call" } }
        }
      }
    },
    tts: { voice_id: "cgSgspJ2msm6clMCkdW9", model_id: "eleven_flash_v2", stability: 0.55, similarity_boost: 0.8, speed: 0.95 },
    language_presets: { es: { overrides: { agent: { first_message: "Hola, soy Martha's Healing Touch AI, o MHT AI para abreviar. ¿Qué tipo de cuidado te gustaría encontrar hoy?", language: "es" }, tts: { voice_id: "8tm9IYjg8ybDoxe8w6Rk", model_id: "eleven_flash_v2_5" } } } },
    conversation: { max_duration_seconds: 600 }
  },
  platform_settings: {
    call_limits: { agent_concurrency_limit: 3, daily_limit: 50, bursting_enabled: false },
    privacy: { record_voice: false, retention_days: 7, delete_audio: true, delete_transcript_and_pii: true },
    auth: { allowlist: [{ hostname: "localhost" }, { hostname: "127.0.0.1" }, { hostname: "marthashealingtouch.com" }, { hostname: "www.marthashealingtouch.com" }], require_origin_header: true },
    widget: { bg_color: "#16382e", text_color: "#f0eddf", btn_color: "#dac6a3", btn_text_color: "#102e28", border_color: "#47634f", focus_color: "#716bd0", border_radius: 12, language_selector: true, start_call_text: "Talk to MHT AI", action_text: "Martha's Healing Touch AI", text_input_enabled: true, transcript_enabled: true, dismissible: true }
  }
};
fs.writeFileSync("docs/elevenlabs-config.json", `${JSON.stringify(config, null, 2)}\n`);
await request(`convai/agents/${state.agentId}`, "PATCH", config);
console.log(`Provisioned ${state.agentId} as ${config.name}`);
