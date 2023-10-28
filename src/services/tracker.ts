import Discord from "discord.js";
import {
  joinVoiceChannel,
  AudioPlayerStatus,
  getVoiceConnection,
} from "@discordjs/voice";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { playersManager } from "./players-manager";
import { queuesManager } from "./queues-manager";
import { AudioResource } from "./audio-resource";
import { YoutubeQuery } from "./youtube-query";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export class Tracker {
  constructor() {}

  public async play(message: Discord.Message, query: string) {
    const channel = message.member?.voice.channel;

    if (!channel) {
      message.reply("You need to join a voice channel first!");
      return;
    }

    const existingPlayer = playersManager.get(channel.guild.id);

    const isAlreadyPlaying = [
      AudioPlayerStatus.Playing,
      AudioPlayerStatus.Paused,
    ].includes(existingPlayer?.state?.status);

    if (isAlreadyPlaying) {
      return this.queueSong(message, query);
    }

    const player = playersManager.create(channel.guild.id);

    player.on(AudioPlayerStatus.Idle, () => {
      if (queuesManager.has(channel.guild.id)) {
        return this.playNext(message);
      }
      getVoiceConnection(channel.guild.id)?.destroy();
    });

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    connection.subscribe(player);

    const audioResource = new AudioResource(query);

    const resource = await audioResource.generate();

    if(!resource) {
      message.reply("I couldn't find this song!");
      return;
    }

    player.play(resource);

    message.reply(`Now playing: ${audioResource.query}`);
  }

  public playNext(message: Discord.Message) {
    const channel = message.member?.voice.channel;

    if (!channel) {
      message.reply("You need to join a voice channel first!");
      return;
    }

    const player = playersManager.get(channel.guild.id);

    if (!player) {
      message.reply("I'm not playing anything!");
      return;
    }

    const query = queuesManager.getNext(channel.guild.id);

    if (!query) {
      message.reply("There is nothing on the queue!");
      return;
    }

    this.play(message, query);
  }

  public pause(message: Discord.Message) {
    const channel = message.member?.voice.channel;

    if (!channel) {
      message.reply("You need to join a voice channel first!");
      return;
    }

    const player = playersManager.get(channel.guild.id);

    if (!player) {
      message.reply("I'm not playing anything!");
      return;
    }

    player.pause();
  }

  public resume(message: Discord.Message) {
    const channel = message.member?.voice.channel;

    if (!channel) {
      message.reply("You need to join a voice channel first!");
      return;
    }

    const player = playersManager.get(channel.guild.id);

    if (!player) {
      message.reply("I'm not playing anything!");
      return;
    }

    player.unpause();
  }

  public stop(message: Discord.Message) {
    const channel = message.member?.voice.channel;

    if (!channel) {
      message.reply("You need to join a voice channel first!");
      return;
    }

    const player = playersManager.get(channel.guild.id);

    if (!player) {
      message.reply("I'm not playing anything!");
      return;
    }

    player.stop();

    playersManager.delete(channel.guild.id);
    queuesManager.delete(channel.guild.id);
  }

  public skip(message: Discord.Message) {
    const channel = message.member?.voice.channel;

    if (!channel) {
      message.reply("You need to join a voice channel first!");
      return;
    }

    const player = playersManager.get(channel.guild.id);

    if (!player) {
      message.reply("I'm not playing anything!");
      return;
    }

    player.stop();
  }

  public async queueSong(message: Discord.Message, query: string) {
    const channel = message.member?.voice.channel;

    if (!channel) {
      message.reply("You need to join a voice channel first!");
      return;
    }

    if (!YoutubeQuery.isValidUrl(query)) {
      const updatedUrl = await YoutubeQuery.getUrlFromQuery(query);

      if (!updatedUrl) {
        message.reply("I couldn't find this song!");
        return;
      }

      query = updatedUrl;
    }

    queuesManager.push(channel.guild.id, query);

    message.reply(`Added to queue: ${query}`);
  }
}
