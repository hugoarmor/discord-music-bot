import Discord from "discord.js";
import { config } from "../config/general";
import { commands } from "../commands";

export class MessageBroker {
  private constructor() {}

  public static publish(message: Discord.Message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.commands.prefix)) return;

    const args = message.content.trim().split(/ +/g);
    const command = args.shift()?.slice(config.commands.prefix.length)?.toLocaleLowerCase();

    const instance = commands[command as keyof typeof commands]?.instance;

    if (!instance) {
      return;
    }

    instance.execute({ message, args });
  }
}
