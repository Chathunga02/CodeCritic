import { feedQuerySchema } from './src/models/feed.model.js';

const res = feedQuerySchema.safeParse({
  query: {},
  body: {},
  params: {}
});

console.log(JSON.stringify(res, null, 2));
