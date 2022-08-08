export type User = {
  id: string;
  email: string;
  passcode: string;
  name: string;
};

export type Company = {
  id: number;
  tickerCode: string;
  name: string;
};

export const database: { users: User[]; companies: Company[] } = {
  users: [
    {
      id: "3dcb4a1f-0c91-42c5-834f-26d227c532e2",
      email: "jd@blad.com",
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
