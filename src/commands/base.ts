export class Command {
  constructor() {}

  public execute(query: unknown) {
    return this.handler(query);
  }

  public handler(query: unknown) {}
}

export enum Commands {
  Play = "play",
  Stop = "stop",
  Pause = "pause",
  Resume = "resume",
  Skip = "skip",
  Queue = "queue",
  Clear = "clear",
  Help = "help",
}
