import prismadb from '@/src/lib/prismadb';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(videoIds: string[]) {
  const videoUrls = videoIds.map((id) => {
    return `id=${id}`;
  });
  const joinUrl = videoUrls.join('&');
  const url = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cid%2C%20liveStreamingDetails&part=player%2CrecordingDetails&part=%20statistics%2Cstatus%2C%20topicDetails&${joinUrl}&key=${process.env.API_KEY_YOUTUBE}`;
  try {
    const response = await axios.get(url);
    const videos = response.data.items;

    for (const video of videos) {
      const videoId = video.id;
      await prismadb.video.updateMany({
        where: {
          id: videoId,
        },
        data: {
          commentCount: video.statistics.commentCount,
          likeCount: video.statistics.likeCount,
          viewCount: video.statistics.viewCount,
          player: video.player.embedHtml,
        },
      });
    }
    return NextResponse.json(response.data);
  } catch (err) {
    console.log(err);
  }
}
