import { Command } from "./base";
import Discord from "discord.js";
import { Tracker } from "../services/tracker";

export class PlayCommand extends Command {
  constructor(private readonly tracker: Tracker) {
    super();
  }

  public override async handler(query: {
    message: Discord.Message;
    args: string[];
  }) {
    this.tracker.play(query.message, query.args?.join(" "));
  }
}
