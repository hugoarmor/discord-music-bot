import Discord from "discord.js";
import { Subscriber } from "./subscribers/base";

export class Server {

  constructor(private readonly client: Discord.Client, private readonly subscribers: (new() => Subscriber)[]) {}

  public printMemoryUsage() {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  }

  public run() {
    this.subscribers.forEach(subscriber => new subscriber().subscribe(this.client));

    this.client.login(process.env.DISCORD_BOT_KEY);

    if (process.env.NODE_ENV === "development") {
      this.client.on("debug", console.log);

      setInterval(() => this.printMemoryUsage, 5000);
    }
  }
}
