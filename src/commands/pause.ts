import { Command } from "./base";
import Discord from "discord.js";
import { Tracker } from "../services/tracker";

export class PauseCommand extends Command {
  constructor(private readonly tracker: Tracker) {
    super();
  }

  public override async handler(query: { message: Discord.Message }) {
    this.tracker.pause(query.message);
  }
}
