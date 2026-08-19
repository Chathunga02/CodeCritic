import { feedService } from './src/service/feed.service.js';

async function run() {
  try {
    const res = await feedService.getPublicFeed({ page: 1, limit: 20 });
    console.log("Success:", res);
  } catch (error: any) {
    console.error("Error occurred:");
    console.error(error.message);
  }
}

run();
