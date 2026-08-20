# Feed Reordering Demo

This artifact captures the in-memory scoring and reordering of the same seeded window for two users with different stacks.

## User A (Alice - Frontend)
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
    "_score": 1
  },
  {
    "id": 1,
    "title": "React Dashboard for Analytics",
    "author": "alice_frontend",
    "matchedTechnologies": [
      "react",
      "typescript",
      "nextjs"
    ],
    "_score": 1
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
    "_score": 0.8190550788976149
  },
  {
    "id": 7,
    "title": "Zustand State Management Demo",
    "author": "alice_frontend",
    "matchedTechnologies": [
      "react",
      "zustand",
      "typescript"
    ],
    "_score": 0.7595275394488075
  },
  {
    "id": 3,
    "title": "Fullstack Todo App",
    "author": "carol_fullstack",
    "matchedTechnologies": [
      "react",
      "typescript"
    ],
    "_score": 0.7047768244618965
  }
]
```

## User B (Dave - Python)
**Stack:** python, django, postgresql

```json
[
  {
    "id": 10,
    "title": "Python Data Pipeline",
    "author": "dave_pythonista",
    "matchedTechnologies": [
      "python",
      "postgresql"
    ],
    "_score": 0.9381101577952299
  },
  {
    "id": 4,
    "title": "Django Blog Engine",
    "author": "dave_pythonista",
    "matchedTechnologies": [
      "python",
      "django",
      "postgresql"
    ],
    "_score": 0.8889881574842309
  },
  {
    "id": 8,
    "title": "Postgres Query Optimizer CLI",
    "author": "bob_backend",
    "matchedTechnologies": [
      "postgresql"
    ],
    "_score": 0.6499999999999999
  },
  {
    "id": 2,
    "title": "Express REST API Starter",
    "author": "bob_backend",
    "matchedTechnologies": [
      "postgresql"
    ],
    "_score": 0.5164956271378414
  },
  {
    "id": 15,
    "title": "Zustand and React Hook Form Demo",
    "author": "carol_fullstack",
    "matchedTechnologies": [],
    "_score": 0.3
  }
]
```
