import supertest from "supertest";
import app from "./src/app.js";
import fs from "fs";

async function main() {
  const req = supertest(app);

  const resA = await req
    .get("/api/feed/personalized?debug=1&limit=5")
    .set("x-test-clerk-user-id", "seed_user_1")
    .expect(200);

  const resB = await req
    .get("/api/feed/personalized?debug=1&limit=5")
    .set("x-test-clerk-user-id", "seed_user_4")
    .expect(200);

  const markdown = `# Feed Reordering Demo

This artifact captures the in-memory scoring and reordering of the same seeded window for two users with different stacks.

## Alice (Frontend)
**Stack:** react, nextjs, typescript, zustand

\`\`\`json
${JSON.stringify(resA.body.data, null, 2)}
\`\`\`

## Dave (Python)
**Stack:** python, django, postgresql

\`\`\`json
${JSON.stringify(resB.body.data, null, 2)}
\`\`\`
`;

  fs.writeFileSync("../docs/feed-demo.md", markdown);
  console.log("Done updating feed-demo.md");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
