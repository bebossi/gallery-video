import prismadb from '@/src/lib/prismadb';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = `https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${process.env.API_KEY_YOUTUBE}`;
  try {
    const response = await axios.get(url);
    const categories = response.data.items;
    for (const category of categories) {
      await prismadb.category.createMany({
        data: {
          id: category.id,
          title: category.snippet.title,
        },
      });
    }
    console.log(response);
    return NextResponse.json(response.data);
  } catch (err) {
    console.log(err);
  }
}
