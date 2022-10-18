import { Company, DbUser } from "./types";

export const database: { users: DbUser[]; companies: Company[] } = {
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
      tickerCode: "GOOGL",
      name: "Google",
    },
  ],
};
