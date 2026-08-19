import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import prisma from './src/config/prisma.js';
import { feedService } from './src/service/feed.service.js';

async function capture() {
  const alice = await prisma.user.findUnique({ where: { username: 'alice_frontend' } });
  const bob = await prisma.user.findUnique({ where: { username: 'bob_backend' } });

  if (!alice || !bob) {
    console.error("Alice or Bob not found in seed data!");
    const allUsers = await prisma.user.findMany({ select: { username: true } });
    console.log("Found users:", allUsers);
    process.exit(1);
  }

  // Set NODE_ENV to development so debug scores show up
  process.env.NODE_ENV = 'development';

  const aliceFeed = await feedService.getPersonalizedFeed({ page: 1, limit: 20, debug: true } as any, alice.id);
  const bobFeed = await feedService.getPersonalizedFeed({ page: 1, limit: 20, debug: true } as any, bob.id);

  let md = `# Feed Reordering Demo

This artifact captures the in-memory scoring and reordering of the same seeded window for two users with different stacks.

## Alice (Frontend)
**Stack:** react, nextjs, typescript, zustand

\`\`\`json
${JSON.stringify(aliceFeed.items.map((i: any) => ({
  id: i.id,
  title: i.title,
  author: i.author.username,
  matchedTechnologies: i.matchedTechnologies,
  _score: i._score
})), null, 2)}
\`\`\`

## Bob (Backend)
**Stack:** nodejs, express, postgresql, prisma

\`\`\`json
${JSON.stringify(bobFeed.items.map((i: any) => ({
  id: i.id,
  title: i.title,
  author: i.author.username,
  matchedTechnologies: i.matchedTechnologies,
  _score: i._score
})), null, 2)}
\`\`\`
`;

  fs.writeFileSync('../docs/feed-demo.md', md);
  console.log("Captured successfully to docs/feed-demo.md");
}

capture().catch(console.error).finally(() => process.exit(0));
