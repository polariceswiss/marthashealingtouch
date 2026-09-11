import fs from "node:fs";
import { localEnv } from "./local-env.mjs";

const env = localEnv();
const metadata = JSON.parse(fs.readFileSync(new URL("../docs/elevenlabs-agent.json", import.meta.url)));
const config = JSON.parse(fs.readFileSync(new URL("../docs/elevenlabs-config.json", import.meta.url)));
const agent = config.conversation_config.agent;
agent.prompt.prompt = agent.prompt.prompt
  .replace("You are Clara, the AI wellness concierge", "You are Martha's Healing Touch AI (MHT AI for short), the AI wellness concierge")
  .replace("No verified Telegram/WhatsApp.", "WhatsApp callback requests are handled on the website: visitors enter their name and number, review exact spelling and digits, then choose when to send the prepared WhatsApp message. Do not claim a lead was submitted unless a real tool confirms it.");
config.platform_settings.widget.start_call_text = "Talk to MHT AI";
config.platform_settings.widget.action_text = "Martha's Healing Touch AI";
const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${metadata.agentId}`, {
  method: "PATCH",
  headers: { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
  body: JSON.stringify(config),
});
if (!response.ok) throw new Error(`ElevenLabs update failed: ${response.status} ${await response.text()}`);
console.log(`Updated ${metadata.agentId} as ${config.name}`);
