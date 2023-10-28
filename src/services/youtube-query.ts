import YouTubeSR from 'youtube-sr';

export class YoutubeQuery {
  private constructor() {}

  public static isValidUrl(url: string) {
    const youtubeUrlRegex =
      /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/gi;

    return youtubeUrlRegex.test(url);
  }

  public static async getUrlFromQuery(query: string) {
    const videos = await YouTubeSR.search(query, { limit: 1, type: "video" });

    if (!videos.length) {
      return null;
    }

    return videos[0].url;
  }
}
