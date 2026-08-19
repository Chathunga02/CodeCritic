# Feed Reordering Demo

This artifact captures the in-memory scoring and reordering of the same seeded window for two users with different stacks.

## Alice (Frontend)
**Stack:** react, nextjs, typescript, zustand

```json
[
  {
    "id": 15,
    "title": "Zustand and React Hook Form Demo",
    "author": "carol_fullstack",
    "matchedTechnologies": [
      "react",
      "typescript",
      "zustand"
    ],
    "_score": 0.8919085142524599
  },
  {
    "id": 1,
    "title": "React Dashboard for Analytics",
    "author": "alice_frontend",
    "matchedTechnologies": [
      "react",
      "nextjs",
      "typescript"
    ],
    "_score": 0.8919085137392623
  },
  {
    "id": 9,
    "title": "TypeScript Utility Library",
    "author": "carol_fullstack",
    "matchedTechnologies": [
      "react",
      "typescript"
    ],
    "_score": 0.8811375165034114
  },
  {
    "id": 13,
    "title": "Next.js Blog Platform",
    "author": "alice_frontend",
    "matchedTechnologies": [
      "react",
      "nextjs",
      "typescript"
    ],
    "_score": 0.7761589441478396
  },
  {
    "id": 7,
    "title": "Zustand State Management Demo",
    "author": "alice_frontend",
    "matchedTechnologies": [
      "react",
      "typescript",
      "zustand"
    ],
    "_score": 0.7380794720739198
  },
  {
    "id": 3,
    "title": "Fullstack Todo App",
    "author": "carol_fullstack",
    "matchedTechnologies": [
      "react",
      "typescript"
    ],
    "_score": 0.618984554962346
  },
  {
    "id": 12,
    "title": "React Native Learning Project",
    "author": "frank_newbie",
    "matchedTechnologies": [
      "react"
    ],
    "_score": 0.44595425686963114
  },
  {
    "id": 6,
    "title": "JavaScript Weather Widget",
    "author": "frank_newbie",
    "matchedTechnologies": [
      "react"
    ],
    "_score": 0.4261589441478396
  },
  {
    "id": 8,
    "title": "Postgres Query Optimizer CLI",
    "author": "bob_backend",
    "matchedTechnologies": [],
    "_score": 0.19190851425245997
  },
  {
    "id": 2,
    "title": "Express REST API Starter",
    "author": "bob_backend",
    "matchedTechnologies": [],
    "_score": 0.1811375165034115
  },
  {
    "id": 10,
    "title": "Python Data Pipeline",
    "author": "dave_pythonista",
    "matchedTechnologies": [],
    "_score": 0.1523178882956793
  },
  {
    "id": 11,
    "title": "CI Pipeline with Docker",
    "author": "erin_devops",
    "matchedTechnologies": [],
    "_score": 0.12089478805706802
  },
  {
    "id": 4,
    "title": "Django Blog Engine",
    "author": "dave_pythonista",
    "matchedTechnologies": [],
    "_score": 0.12089478805706802
  },
  {
    "id": 5,
    "title": "Dockerized Microservice Template",
    "author": "erin_devops",
    "matchedTechnologies": [],
    "_score": 0.09595425686963115
  },
  {
    "id": 14,
    "title": "Prisma Schema Design Sample",
    "author": "bob_backend",
    "matchedTechnologies": [],
    "_score": 0.038079472073919825
  }
]
```

## Bob (Backend)
**Stack:** nodejs, express, postgresql, prisma

```json
[
  {
    "id": 8,
    "title": "Postgres Query Optimizer CLI",
    "author": "bob_backend",
    "matchedTechnologies": [
      "nodejs",
      "postgresql"
    ],
    "_score": 0.8919085055280991
  },
  {
    "id": 2,
    "title": "Express REST API Starter",
    "author": "bob_backend",
    "matchedTechnologies": [
      "nodejs",
      "express",
      "postgresql"
    ],
    "_score": 0.8811375087531055
  },
  {
    "id": 14,
    "title": "Prisma Schema Design Sample",
    "author": "bob_backend",
    "matchedTechnologies": [
      "nodejs",
      "postgresql",
      "prisma"
    ],
    "_score": 0.7380794704446186
  },
  {
    "id": 10,
    "title": "Python Data Pipeline",
    "author": "dave_pythonista",
    "matchedTechnologies": [
      "postgresql"
    ],
    "_score": 0.5023178817784748
  },
  {
    "id": 3,
    "title": "Fullstack Todo App",
    "author": "carol_fullstack",
    "matchedTechnologies": [
      "nodejs"
    ],
    "_score": 0.3856512151118081
  },
  {
    "id": 4,
    "title": "Django Blog Engine",
    "author": "dave_pythonista",
    "matchedTechnologies": [
      "postgresql"
    ],
    "_score": 0.3542281162176927
  },
  {
    "id": 5,
    "title": "Dockerized Microservice Template",
    "author": "erin_devops",
    "matchedTechnologies": [
      "nodejs"
    ],
    "_score": 0.3292875860973829
  },
  {
    "id": 15,
    "title": "Zustand and React Hook Form Demo",
    "author": "carol_fullstack",
    "matchedTechnologies": [],
    "_score": 0.19190850552809918
  },
  {
    "id": 1,
    "title": "React Dashboard for Analytics",
    "author": "alice_frontend",
    "matchedTechnologies": [],
    "_score": 0.19190850552809918
  },
  {
    "id": 9,
    "title": "TypeScript Utility Library",
    "author": "carol_fullstack",
    "matchedTechnologies": [],
    "_score": 0.18113750875310558
  },
  {
    "id": 11,
    "title": "CI Pipeline with Docker",
    "author": "erin_devops",
    "matchedTechnologies": [],
    "_score": 0.12089478288435938
  },
  {
    "id": 12,
    "title": "React Native Learning Project",
    "author": "frank_newbie",
    "matchedTechnologies": [],
    "_score": 0.09595425276404958
  },
  {
    "id": 13,
    "title": "Next.js Blog Platform",
    "author": "alice_frontend",
    "matchedTechnologies": [],
    "_score": 0.07615894088923741
  },
  {
    "id": 6,
    "title": "JavaScript Weather Widget",
    "author": "frank_newbie",
    "matchedTechnologies": [],
    "_score": 0.07615894088923741
  },
  {
    "id": 7,
    "title": "Zustand State Management Demo",
    "author": "alice_frontend",
    "matchedTechnologies": [],
    "_score": 0.038079470444618714
  }
]
```
