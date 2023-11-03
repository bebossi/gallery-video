import prismadb from '@/src/lib/prismadb';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextApiRequest) {
  const { searchParams } = new URL(req.url!);

  const playlistId = searchParams.get('playlistId') as string;
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${playlistId}&key=AIzaSyDU4qme-sFwTPIzdKffOyak2fIy_3FTJGc`;
  try {
    const response = await axios.get(url);
    const playlistItems = response.data.items;

    for (const playlistItem of playlistItems) {
      const channelId = playlistItem.snippet.channelId;

      const channelExists = await prismadb.channel.findUnique({
        where: {
          id: channelId,
        },
      });

      if (!channelExists) {
        await prismadb.channel.create({
          data: {
            id: channelId,
            title: playlistItem.snippet.chnanelTitle,
          },
        });
      }

      const playlistVideo = await prismadb.video.createMany({
        data: {
          id: playlistItem.contentDetails.videoId,
          url: playlistItem.snippet.resourceId.videoId,
          title: playlistItem.snippet.title,
          description: playlistItem.snippet.description,
          thumbnailUrl: playlistItem.snippet.thumbnails.default.url,
          thumbnailWidth: playlistItem.snippet.thumbnails.default.width,
          thumbnailHeight: playlistItem.snippet.thumbnails.default.height,
          channelId,
        },
        skipDuplicates: true,
      });
    }
    console.log(response.data);

    return NextResponse.json(response.data);
  } catch (err) {
    console.log(err);
    // throw err;
  }
}
