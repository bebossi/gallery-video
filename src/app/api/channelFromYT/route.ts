import prismadb from '@/src/lib/prismadb';
import axios from 'axios';

export async function getChannelDataFromYt(channelsIds: string[]) {
  const channelsIdsUrl = channelsIds.map((channelId) => {
    return `id=${channelId}`;
  });
  const joinUrl = channelsIdsUrl.join('&');
  const url = `https://youtube.googleapis.com/youtube/v3/channels?part=brandingSettings%20%2CcontentDetails%20%2CcontentOwnerDetails%20%2Cid%20%2Clocalizations%20%2Csnippet%20%2Cstatistics%20%2Cstatus%2C%20topicDetails&${joinUrl}&key=${process.env.API_KEY_YOUTUBE}`;

  try {
    const response = await axios.get(url);
    const channels = response.data.items;

    for (const channel of channels) {
      const channelId = channel.id;
      await prismadb.channel.updateMany({
        where: {
          id: channelId,
        },
        data: {
          customUrl: channel.snippet.customUrl,
          description: channel.snippet.description,
          image: channel.brandingSettings.image?.bannerExternalUrl || '',
          keyWords: channel.brandingSettings.channel.keywords,
          subscriberCount: channel.statistics.subscriberCount,
          thumbnailHeight: channel.snippet.thumbnails.default.height,
          thumbnailUrl: channel.snippet.thumbnails.default.url,
          thumbnailWidth: channel.snippet.thumbnails.default.width,
          videoCount: channel.statistics.videoCount,
          viewCount: channel.statistics.viewCount,
        },
      });
    }

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
