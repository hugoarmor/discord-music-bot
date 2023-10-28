import Discord, { Client } from "discord.js";
import { config } from "./config/general";
import { Server } from "./server";
import { subscribers } from "./subscribers";
import "dotenv/config";

const client: Client = new Discord.Client({
  intents: config.intents,
});

const server = new Server(client, subscribers)

server.run()
