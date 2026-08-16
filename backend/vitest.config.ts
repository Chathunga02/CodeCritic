import { defineConfig } from "vitest/config";
import { config as loadEnv } from "dotenv";

loadEnv();

export default defineConfig({
  test: {
    environment: "node",
    globalSetup: ["./tests/globalSetup.ts"],
    // All integration test files share one real Postgres database with
    // mutable state (karma, unique constraints), so parallel files would
    // race each other. Serialize instead of isolating per file.
    fileParallelism: false,
    env: {
      NODE_ENV: "test",
      DATABASE_URL: process.env.DATABASE_URL_TEST,
    },
  },
});
