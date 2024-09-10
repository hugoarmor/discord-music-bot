import {
  createAudioResource,
} from "@discordjs/voice";
import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { PassThrough, Readable } from "stream";
import { YoutubeQuery } from "./youtube-query";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export class AudioResource {
  constructor(public query: SearchQuery) {}

  public async generate() {
    if (!YoutubeQuery.isValidUrl(this.query)) {
      const updatedQuery = await YoutubeQuery.getUrlFromQuery(this.query);

      if (!updatedQuery) {
        return null;
      }

      this.query = updatedQuery
    }


    const stream = ytdl(this.query, {
      quality: "highestaudio",
      highWaterMark: 1 << 25,
    });

    const passThrough = new PassThrough();

    const ffmpegStream = ffmpeg()
      .input(stream)
      .audioCodec("libopus")
      .toFormat("opus")
      .audioBitrate(92)
      .audioFrequency(48000)
      .audioChannels(2)
      .audioQuality(0)
      .on("error", (error) => {
        console.error(error);
      })
      .pipe(passThrough);

    const resource = createAudioResource(ffmpegStream as Readable);

    return resource
  }
}
