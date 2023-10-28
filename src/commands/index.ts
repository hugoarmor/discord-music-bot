import { Tracker } from "../services/tracker";
import { Commands } from "./base";
import { PauseCommand } from "./pause";
import { PlayCommand } from "./play";
import { ResumeCommand } from "./resume";
import { SkipCommand } from "./skip";
import { StopCommand } from "./stop";

export const commands = {
  [Commands.Play]: {
    description: "Plays a song.",
    usage: "!play <youtube-url>",
    instance: new PlayCommand(new Tracker()),
  },
  [Commands.Pause]: {
    description: "Pauses a song.",
    usage: "!pause",
    instance: new PauseCommand(new Tracker()),
  },
  [Commands.Resume]: {
    description: "Resumes a song.",
    usage: "!resume",
    instance: new ResumeCommand(new Tracker()),
  },
  [Commands.Stop]: {
    description: "Stops a song.",
    usage: "!stop",
    instance: new StopCommand(new Tracker()),
  },
  [Commands.Skip]: {
    description: "Skips to the next song.",
    usage: "!skip",
    instance: new SkipCommand(new Tracker()),
  },
}
