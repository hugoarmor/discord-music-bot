import { Subscriber } from "./base";
import Discord, { Events } from "discord.js";
import { MessageBroker } from "../services/message-broker";

export class MessageCreateSubscriber extends Subscriber {
  constructor() {
    super(Events.MessageCreate);
  }

  public override async handler(message: Discord.Message) {
    MessageBroker.publish(message);
  }
}
