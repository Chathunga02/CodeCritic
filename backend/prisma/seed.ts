import prisma from "../src/config/prisma.js";

// KARMA_PER_REVIEW moves to config/constants.ts once that file exists in Phase 2 (D-13, D-18).
// Karma below is always computed from real review counts, never hardcoded per user.
const KARMA_PER_REVIEW = 2;

const TECHNOLOGIES = [
  "react",
  "nextjs",
  "typescript",
  "javascript",
  "nodejs",
  "express",
  "postgresql",
  "prisma",
  "python",
  "django",
  "docker",
  "zustand",
];

type UserSeed = {
  clerkId: string;
  username: string;
  bio: string;
  stack: string[];
};

const USERS: UserSeed[] = [
  {
    clerkId: "seed_user_1",
    username: "alice_frontend",
    bio: "Frontend developer focused on React and design systems.",
    stack: ["react", "nextjs", "typescript", "zustand"],
  },
  {
    clerkId: "seed_user_2",
    username: "bob_backend",
    bio: "Backend engineer building APIs with Node and Postgres.",
    stack: ["nodejs", "express", "postgresql", "prisma"],
  },
  {
    clerkId: "seed_user_3",
    username: "carol_fullstack",
    bio: "Fullstack developer, React on the front, Node on the back.",
    stack: ["react", "nodejs", "typescript", "postgresql"],
  },
  {
    clerkId: "seed_user_4",
    username: "dave_pythonista",
    bio: "Python developer working mostly with Django.",
    stack: ["python", "django", "postgresql"],
  },
  {
    clerkId: "seed_user_5",
    username: "erin_devops",
    bio: "DevOps engineer, containers and pipelines.",
    stack: ["docker", "nodejs", "javascript"],
  },
  {
    clerkId: "seed_user_6",
    username: "frank_newbie",
    bio: "Learning web development, mostly JavaScript so far.",
    stack: ["javascript", "react"],
  },
];

type SubmissionSeed = {
  authorIndex: number;
  title: string;
  description: string;
  githubUrl: string;
  tags: string[];
  criteria: string[];
  ageHours: number;
};

const SUBMISSIONS: SubmissionSeed[] = [
  {
    authorIndex: 0,
    title: "React Dashboard for Analytics",
    description: "A dashboard for visualizing product analytics, built with React and Recharts.",
    githubUrl: "https://github.com/seed/react-analytics-dashboard",
    tags: ["react", "typescript", "nextjs"],
    criteria: ["Code Quality", "Documentation", "Performance"],
    ageHours: 0,
  },
  {
    authorIndex: 1,
    title: "Express REST API Starter",
    description: "A starter template for REST APIs with Express, structured around a layered architecture.",
    githubUrl: "https://github.com/seed/express-rest-starter",
    tags: ["nodejs", "express", "postgresql"],
    criteria: ["Code Quality", "Test Coverage"],
    ageHours: 6,
  },
  {
    authorIndex: 2,
    title: "Fullstack Todo App",
    description: "A todo application with a React frontend and a Node backend sharing a Postgres database.",
    githubUrl: "https://github.com/seed/fullstack-todo",
    tags: ["react", "nodejs", "typescript"],
    criteria: ["Code Quality", "Documentation", "Test Coverage", "Performance"],
    ageHours: 24,
  },
  {
    authorIndex: 3,
    title: "Django Blog Engine",
    description: "A blogging platform built with Django, supporting posts, tags, and comments.",
    githubUrl: "https://github.com/seed/django-blog-engine",
    tags: ["python", "django", "postgresql"],
    criteria: ["Code Quality", "Documentation"],
    ageHours: 48,
  },
  {
    authorIndex: 4,
    title: "Dockerized Microservice Template",
    description: "A template for a Node microservice with a multi-stage Dockerfile and compose setup.",
    githubUrl: "https://github.com/seed/docker-microservice-template",
    tags: ["docker", "nodejs", "javascript"],
    criteria: ["Code Quality", "Performance", "Documentation"],
    ageHours: 72,
  },
  {
    authorIndex: 5,
    title: "JavaScript Weather Widget",
    description: "A small embeddable weather widget written in vanilla JavaScript.",
    githubUrl: "https://github.com/seed/js-weather-widget",
    tags: ["javascript", "react"],
    criteria: ["Code Quality", "Documentation"],
    ageHours: 96,
  },
  {
    authorIndex: 0,
    title: "Zustand State Management Demo",
    description: "A demo app comparing Zustand against Context for cross-component state.",
    githubUrl: "https://github.com/seed/zustand-state-demo",
    tags: ["react", "zustand", "typescript"],
    criteria: ["Code Quality", "Documentation", "Performance"],
    ageHours: 168,
  },
  {
    authorIndex: 1,
    title: "Postgres Query Optimizer CLI",
    description: "A CLI tool that analyzes slow Postgres queries and suggests indexes.",
    githubUrl: "https://github.com/seed/pg-query-optimizer-cli",
    tags: ["postgresql", "nodejs"],
    criteria: ["Code Quality", "Performance"],
    ageHours: 0,
  },
  {
    authorIndex: 2,
    title: "TypeScript Utility Library",
    description: "A small collection of type-safe utility functions for everyday TypeScript projects.",
    githubUrl: "https://github.com/seed/ts-utility-library",
    tags: ["typescript", "react"],
    criteria: ["Code Quality", "Documentation", "Test Coverage"],
    ageHours: 6,
  },
  {
    authorIndex: 3,
    title: "Python Data Pipeline",
    description: "A batch data pipeline that loads, transforms, and stores data into Postgres.",
    githubUrl: "https://github.com/seed/python-data-pipeline",
    tags: ["python", "postgresql"],
    criteria: ["Code Quality", "Performance"],
    ageHours: 24,
  },
  {
    authorIndex: 4,
    title: "CI Pipeline with Docker",
    description: "A GitHub Actions pipeline that builds, tests, and ships a Dockerized app.",
    githubUrl: "https://github.com/seed/ci-pipeline-docker",
    tags: ["docker", "javascript"],
    criteria: ["Code Quality", "Documentation"],
    ageHours: 48,
  },
  {
    authorIndex: 5,
    title: "React Native Learning Project",
    description: "A first attempt at a mobile app with React Native, still rough around the edges.",
    githubUrl: "https://github.com/seed/react-native-learning",
    tags: ["react", "javascript"],
    criteria: ["Code Quality", "Documentation", "Test Coverage"],
    ageHours: 72,
  },
  {
    authorIndex: 0,
    title: "Next.js Blog Platform",
    description: "A statically generated blog platform built on the Next.js App Router.",
    githubUrl: "https://github.com/seed/nextjs-blog-platform",
    tags: ["nextjs", "react", "typescript"],
    criteria: ["Code Quality", "Documentation", "Performance", "Test Coverage"],
    ageHours: 96,
  },
  {
    authorIndex: 1,
    title: "Prisma Schema Design Sample",
    description: "An example schema showing relation modes and index strategy in Prisma.",
    githubUrl: "https://github.com/seed/prisma-schema-sample",
    tags: ["prisma", "postgresql", "nodejs"],
    criteria: ["Code Quality", "Documentation"],
    ageHours: 168,
  },
  {
    authorIndex: 2,
    title: "Zustand and React Hook Form Demo",
    description: "A form-heavy demo app combining Zustand for global state and React Hook Form for forms.",
    githubUrl: "https://github.com/seed/zustand-rhf-demo",
    tags: ["zustand", "react", "typescript"],
    criteria: ["Code Quality", "Documentation", "Performance"],
    ageHours: 0,
  },
  {
    authorIndex: 0,
    title: "Antigravity Levitation Dashboard",
    description: "A full-stack application to monitor and calibrate antigravity propulsion metrics. Features a responsive UI and containerized backend physics engine.",
    githubUrl: "https://github.com/seed/antigravity-levitation-dashboard",
    tags: ["python", "react", "docker"],
    criteria: ["Code Quality", "Documentation", "Performance"],
    ageHours: 24,
  },
];

type ReviewSeed = {
  submissionIndex: number;
  reviewerIndex: number;
  feedback: string;
};

// submissionIndex 6 (Zustand State Management Demo) intentionally has no reviews here,
// so it proves the PENDING status path. submissionIndex 0 has three, proving the 3+ path.
const REVIEWS: ReviewSeed[] = [
  { submissionIndex: 0, reviewerIndex: 1, feedback: "Clean component structure and the charts render fast even with a lot of data points." },
  { submissionIndex: 0, reviewerIndex: 2, feedback: "Good use of TypeScript generics for the chart props. Docs could use a setup section." },
  { submissionIndex: 0, reviewerIndex: 3, feedback: "Performance holds up well on large datasets, nicely done." },
  { submissionIndex: 1, reviewerIndex: 4, feedback: "The layered structure makes it easy to see where to add new routes. Tests are a bit thin." },
  { submissionIndex: 2, reviewerIndex: 5, feedback: "Solid end to end example, the shared types between client and server are a nice touch." },
  { submissionIndex: 3, reviewerIndex: 0, feedback: "Readable views and models, documentation could use a quickstart." },
  { submissionIndex: 4, reviewerIndex: 1, feedback: "The compose healthcheck ordering is exactly right, saved me some debugging." },
  { submissionIndex: 5, reviewerIndex: 2, feedback: "Small and focused, does what it says without extra dependencies." },
  { submissionIndex: 7, reviewerIndex: 3, feedback: "The index suggestions were spot on for the sample queries provided." },
  { submissionIndex: 8, reviewerIndex: 4, feedback: "Useful set of helpers, would like to see a few more edge case tests." },
  { submissionIndex: 9, reviewerIndex: 5, feedback: "Pipeline stages are clearly separated, good use of typed intermediate results." },
  { submissionIndex: 10, reviewerIndex: 0, feedback: "Pipeline is easy to follow, caching the build layer would speed it up further." },
  { submissionIndex: 11, reviewerIndex: 1, feedback: "Good first attempt, navigation could use some polish but the core screens work." },
  { submissionIndex: 12, reviewerIndex: 2, feedback: "Static generation setup is clean, and the routing follows the App Router conventions well." },
  { submissionIndex: 13, reviewerIndex: 3, feedback: "Relation mode choices are explained well in the comments, good reference example." },
  { submissionIndex: 14, reviewerIndex: 4, feedback: "Form validation feels solid, and the store stays small since it only holds UI state." },
];

async function seedTechnologies() {
  await prisma.technology.createMany({
    data: TECHNOLOGIES.map((name) => ({ name })),
  });
}

async function seedUsers() {
  const created = [];
  for (const u of USERS) {
    const user = await prisma.user.create({
      data: {
        clerkId: u.clerkId,
        username: u.username,
        bio: u.bio,
        technologies: { connect: u.stack.map((name) => ({ name })) },
      },
    });
    created.push(user);
  }
  return created;
}

type Users = Awaited<ReturnType<typeof seedUsers>>;

async function seedSubmissions(users: Users, now: Date) {
  const created = [];
  for (const s of SUBMISSIONS) {
    const submission = await prisma.submission.create({
      data: {
        title: s.title,
        description: s.description,
        githubUrl: s.githubUrl,
        authorId: users[s.authorIndex].id,
        createdAt: new Date(now.getTime() - s.ageHours * 60 * 60 * 1000),
        technologies: { connect: s.tags.map((name) => ({ name })) },
        criteria: { create: s.criteria.map((label) => ({ label })) },
      },
      include: { criteria: true },
    });
    created.push(submission);
  }
  return created;
}

type Submissions = Awaited<ReturnType<typeof seedSubmissions>>;

async function seedReviews(users: Users, submissions: Submissions) {
  for (const [index, r] of REVIEWS.entries()) {
    const submission = submissions[r.submissionIndex];
    const reviewer = users[r.reviewerIndex];

    await prisma.review.create({
      data: {
        feedback: r.feedback,
        reviewerId: reviewer.id,
        submissionId: submission.id,
        ratings: {
          create: submission.criteria.map((criterion, criterionIndex) => ({
            criterionId: criterion.id,
            rating: ((index * 2 + criterionIndex) % 5) + 1,
          })),
        },
      },
    });
  }
}

async function syncKarma(users: Users) {
  for (const user of users) {
    const reviewCount = await prisma.review.count({ where: { reviewerId: user.id } });
    await prisma.user.update({
      where: { id: user.id },
      data: { karma: reviewCount * KARMA_PER_REVIEW },
    });
  }
}

async function verify() {
  const karmaViolations = await prisma.$queryRaw<unknown[]>`
    SELECT u.id, u.username, u.karma, 2 * COUNT(r.id) AS expected
    FROM "User" u
    LEFT JOIN "Review" r ON r."reviewerId" = u.id
    GROUP BY u.id
    HAVING u.karma <> 2 * COUNT(r.id)
  `;

  const selfReviewViolations = await prisma.$queryRaw<unknown[]>`
    SELECT r.id
    FROM "Review" r
    JOIN "Submission" s ON s.id = r."submissionId"
    WHERE s."authorId" = r."reviewerId"
  `;

  const ratingCompletenessViolations = await prisma.$queryRaw<unknown[]>`
    SELECT r.id AS review_id
    FROM "Review" r
    JOIN "Submission" s ON s.id = r."submissionId"
    LEFT JOIN "Criterion" c ON c."submissionId" = s.id
    LEFT JOIN "CriterionRating" cr
      ON cr."reviewId" = r.id AND cr."criterionId" = c.id
    GROUP BY r.id
    HAVING COUNT(c.id) <> COUNT(cr.id)
  `;

  const crossSubmissionRatingViolations = await prisma.$queryRaw<unknown[]>`
    SELECT cr.id
    FROM "CriterionRating" cr
    JOIN "Review" r ON r.id = cr."reviewId"
    JOIN "Criterion" c ON c.id = cr."criterionId"
    WHERE c."submissionId" <> r."submissionId"
  `;

  const tagNormalizationViolations = await prisma.$queryRaw<unknown[]>`
    SELECT id, name FROM "Technology"
    WHERE name <> lower(btrim(name))
  `;

  const criteriaBoundsViolations = await prisma.$queryRaw<unknown[]>`
    SELECT s.id, COUNT(c.id) AS criteria
    FROM "Submission" s
    LEFT JOIN "Criterion" c ON c."submissionId" = s.id
    GROUP BY s.id
    HAVING COUNT(c.id) < 1 OR COUNT(c.id) > 5
  `;

  const checks: [string, unknown[]][] = [
    ["V-Q1 karma equation", karmaViolations],
    ["V-Q2 self-review", selfReviewViolations],
    ["V-Q3 rating completeness", ratingCompletenessViolations],
    ["V-Q4 cross-submission ratings", crossSubmissionRatingViolations],
    ["V-Q5 tag normalization", tagNormalizationViolations],
    ["V-Q6 criteria bounds", criteriaBoundsViolations],
  ];

  const failed = checks.filter(([, rows]) => rows.length > 0);

  if (failed.length > 0) {
    for (const [name, rows] of failed) {
      process.stderr.write(`${name} failed with ${rows.length} violating row(s)\n`);
    }
    throw new Error("Seed self-check failed");
  }

  process.stdout.write("Seed self-check passed: V-Q1 through V-Q6 all return zero rows\n");
}

async function main() {
  const now = new Date();

  await seedTechnologies();
  const users = await seedUsers();
  const submissions = await seedSubmissions(users, now);
  await seedReviews(users, submissions);
  await syncKarma(users);
  await verify();
}

main()
  .catch((error) => {
    process.stderr.write(`${error instanceof Error ? (error.stack ?? error.message) : String(error)}\n`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
