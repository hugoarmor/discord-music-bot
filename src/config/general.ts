import { GatewayIntentBits } from "discord.js";

export const config = {
  commands: {
    prefix: "!",
  },
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ]
}
