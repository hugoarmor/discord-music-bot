import { Subscriber } from "./base";
import { Events } from "discord.js";

export class ReadySubscriber extends Subscriber {
  constructor() {
    super(Events.ClientReady);
  }

  public override handler() {
    const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

    console.log(`🚀 Logged in at time ${currentTime}`);
  }
}
