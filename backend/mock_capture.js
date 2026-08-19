import fs from 'fs';

const FEED_TAG_WEIGHT = 0.7;
const FEED_RECENCY_WEIGHT = 0.3;
const FEED_HALF_LIFE_HOURS = 72;

function tagScore(userTechs, submissionTechs) {
  if (submissionTechs.length === 0) return 0;
  const userSet = new Set(userTechs);
  let matchCount = 0;
  for (const tech of submissionTechs) {
    if (userSet.has(tech)) matchCount++;
  }
  return matchCount / submissionTechs.length;
}

function recencyScore(ageHours) {
  const lambda = Math.LN2 / FEED_HALF_LIFE_HOURS;
  return Math.exp(-lambda * ageHours);
}

function finalScore(tagScoreVal, recencyScoreVal) {
  return (FEED_TAG_WEIGHT * tagScoreVal) + (FEED_RECENCY_WEIGHT * recencyScoreVal);
}

const aliceTechs = ["react", "nextjs", "typescript", "zustand"];
const daveTechs = ["python", "django", "postgresql"];

const submissions = [
  { id: 1, title: "React Dashboard for Analytics", author: "alice_frontend", tags: ["react", "typescript", "nextjs"], ageHours: 0 },
  { id: 2, title: "Express REST API Starter", author: "bob_backend", tags: ["nodejs", "express", "postgresql"], ageHours: 6 },
  { id: 3, title: "Fullstack Todo App", author: "carol_fullstack", tags: ["react", "nodejs", "typescript"], ageHours: 24 },
  { id: 4, title: "Django Blog Engine", author: "dave_pythonista", tags: ["python", "django", "postgresql"], ageHours: 48 },
  { id: 5, title: "Dockerized Microservice Template", author: "erin_devops", tags: ["docker", "nodejs", "javascript"], ageHours: 72 },
  { id: 6, title: "JavaScript Weather Widget", author: "frank_newbie", tags: ["javascript", "react"], ageHours: 96 },
  { id: 7, title: "Zustand State Management Demo", author: "alice_frontend", tags: ["react", "zustand", "typescript"], ageHours: 168 },
  { id: 8, title: "Postgres Query Optimizer CLI", author: "bob_backend", tags: ["postgresql", "nodejs"], ageHours: 0 },
  { id: 9, title: "TypeScript Utility Library", author: "carol_fullstack", tags: ["typescript", "javascript"], ageHours: 6 },
  { id: 10, title: "Python Data Pipeline", author: "dave_pythonista", tags: ["python", "postgresql"], ageHours: 24 },
  { id: 11, title: "CI Pipeline with Docker", author: "erin_devops", tags: ["docker", "yaml"], ageHours: 48 },
  { id: 12, title: "React Native Learning Project", author: "frank_newbie", tags: ["react", "javascript"], ageHours: 72 },
  { id: 13, title: "Next.js Blog Platform", author: "alice_frontend", tags: ["react", "nextjs", "typescript"], ageHours: 96 },
  { id: 14, title: "Prisma Schema Design Sample", author: "bob_backend", tags: ["postgresql", "prisma", "nodejs"], ageHours: 168 },
  { id: 15, title: "Zustand and React Hook Form Demo", author: "carol_fullstack", tags: ["react", "typescript", "zustand"], ageHours: 0 }
];

function scoreForUser(techs, limit) {
  const scored = submissions.map(s => {
    const tScore = tagScore(techs, s.tags);
    const rScore = recencyScore(s.ageHours);
    const fScore = finalScore(tScore, rScore);
    const matchedTechnologies = s.tags.filter(t => techs.includes(t));
    return {
      id: s.id,
      title: s.title,
      author: s.author,
      matchedTechnologies,
      _score: fScore,
      ageHours: s.ageHours // for tie-breaking
    };
  });
  
  scored.sort((a, b) => {
    if (Math.abs(a._score - b._score) > 0.000001) return b._score - a._score;
    if (a.ageHours !== b.ageHours) return a.ageHours - b.ageHours; // smaller ageHours means more recent
    return b.id - a.id;
  });

  return scored.slice(0, limit).map(s => {
    delete s.ageHours;
    return s;
  });
}

const aliceScores = scoreForUser(aliceTechs, 5);
const daveScores = scoreForUser(daveTechs, 5);

const markdown = `# Feed Reordering Demo

This artifact captures the in-memory scoring and reordering of the same seeded window for two users with different stacks.

## User A (Alice - Frontend)
**Stack:** react, nextjs, typescript, zustand

\`\`\`json
${JSON.stringify(aliceScores, null, 2)}
\`\`\`

## User B (Dave - Python)
**Stack:** python, django, postgresql

\`\`\`json
${JSON.stringify(daveScores, null, 2)}
\`\`\`
`;

fs.writeFileSync('../docs/feed-demo.md', markdown);
console.log('Done');
