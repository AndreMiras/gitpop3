import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node", // Different from frontend (jsdom)
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts"],
      reportsDirectory: "./coverage",
    },
  },
});
