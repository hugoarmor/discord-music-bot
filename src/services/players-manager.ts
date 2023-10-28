import { AudioPlayer, createAudioPlayer } from "@discordjs/voice";

type PlayersMenu = {
  [guildId: string]: AudioPlayer
}

class PlayersManager {
  private playersMenu: PlayersMenu = {};
  private static instance?: PlayersManager;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new PlayersManager();
    }

    return this.instance;
  }

  public get(guildId: string) {
    return this.playersMenu[guildId];
  }

  public create(guildId: string) {
    const player = createAudioPlayer();

    this.playersMenu[guildId] = player;

    return player;
  }

  public delete(guildId: string) {
    delete this.playersMenu[guildId];
  }

  public has(guildId: string) {
    return !!this.playersMenu[guildId];
  }
}

export const playersManager = PlayersManager.getInstance();
