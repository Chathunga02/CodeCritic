# CodeCritic Demo & Walkthrough Checklist

> **Audience:** The CodeCritic development team. Use this checklist before and during the final grading walkthrough or any demonstration of the platform.

## Pre-Demo Readiness (Run 10 minutes before the call)

- [ ] **Pre-Warm the APIs:** Free-tier Render instances spin down after inactivity and take up to a minute to cold start. Pre-warm the backend by visiting `/api/health` on the deployed URL.
- [ ] **Check the Frontend:** Open the deployed frontend URL in your browser and confirm it loads successfully.
- [ ] **Verify Seeded Users:** Ensure the two demo accounts are ready:
  - Account 1: `alice_frontend` (Stack: React, Next.js, TypeScript, Zustand)
  - Account 2: `bob_backend` (Stack: Node.js, Express, PostgreSQL, Prisma)

## The Live Demo Sequence

1. **Sign-out State (The Public Feed)**
   - Open the homepage while logged out.
   - Show that the feed is purely reverse-chronological (`createdAt DESC`).
   - Demonstrate that filtering applies correctly on the public feed.

2. **Personalized Feed (Flagship Feature)**
   - **User 1 (Alice):** Log in as `alice_frontend`.
   - Show the homepage feed and note the ordering. Alice should see frontend-related submissions prioritized due to tag overlap, with matched tags visibly highlighted.
   - **User 2 (Bob):** In a separate browser or incognito window, log in as `bob_backend`.
   - Show the homepage feed. Bob should see backend-related submissions prioritized.
   - Explain the scoring mechanism: `finalScore = tagScore * 0.7 + recencyScore * 0.3`, ensuring the flagship grading requirement is satisfied.

3. **Posting & Reviewing (Workflows A & B)**
   - As Bob, post a new review request (Workflow A). Include criteria.
   - As Alice, view Bob's new request.
   - Point out Alice's current Karma in the navbar.
   - Have Alice fill out the one-shot review form for Bob's submission (Workflow B), completing the ratings and text feedback.
   - Hit Submit. Highlight that Alice's Karma instantly increases by `+2` without a page refresh (Zustand state update).

4. **Edge Cases & Invariants**
   - Attempt to review a submission you own, demonstrating the form is disabled/rejected.
   - Explain the missing delete buttons: "Nothing is ever deleted per the SRS, preventing karma/review orphan cascades."
   - (If asked about `?debug=1`) Emphasize that the `_score` property never leaks in the production environment.

## Quick Q&A Answers (Layer Explanations)
- **Why no deletion?** "Deleting cascades away reviews while karma survives, breaking traceability. The spec explicitly excludes deletion, so we didn't build an attack surface the spec forbids."
- **Why no ledger table for Karma?** "Karma = 2 × reviews. Since reviews are immutable and undeletable, a ledger is redundant."
- **Why offset pagination instead of cursors?** "It was the pattern taught in class. It's a known trade-off—new posts can shift page boundaries, but our personalized feed window is bounded at 200 items, making the offset math exact."
- **Why does the Dockerfile never run in production?** "Render builds natively and we use Neon for Postgres. The Dockerfile exists for identical local environments, disposable test databases, and as a portfolio artifact."
