import { Subscriber } from "./base";
import Discord, { Events } from "discord.js";

export class ErrorSubscriber extends Subscriber {
  constructor() {
    super(Events.Error);
  }

  public override handler(error: Discord.ErrorEvent) {
    console.error(error);
  }
}
