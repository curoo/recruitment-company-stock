import { Company, DbUser } from "./types";

export type Database = { users: DbUser[]; companies: Company[] }

export const database: Database = {
  users: [
    {
      id: "3dcb4a1f-0c91-42c5-834f-26d227c532e2",
      email: "jd@example.com",
      passcode: "1234",
      name: "John Doe",
    },
  ],
  companies: [
    {
      id: 1,
      tickerCode: "AAPL",
      name: "Apple",
    },
    {
      id: 2,
      tickerCode: "GOOG",
      name: "Google",
    },
  ],
};
