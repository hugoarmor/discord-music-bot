import Discord from "discord.js";

export class Subscriber {
  constructor(private readonly prefix: Discord.Events) {}

  public subscribe(client: Discord.Client) {
    client.on(this.prefix as string, this.handler);
  }

  public handler(event: unknown) {}
}
