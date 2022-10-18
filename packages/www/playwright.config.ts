import type { PlaywrightTestConfig } from "@playwright/test";

require("dotenv").config({ path: "../../.env" });

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  use: {
    channel: "chrome",
    baseURL: "http://localhost:8080",
    trace: "on-first-retry",
  },
  webServer: {
    command: "cd ../../ && npm start 2>/dev/null",
    reuseExistingServer: !!process.env.REUSE_SERVER,
    port: 8080,
  },
};

export default config;
