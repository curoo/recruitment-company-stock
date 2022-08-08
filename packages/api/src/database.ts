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
      email: "jb@jamesbe.com",
      passcode: "1234",
      name: "James",
    },
    {
      id: "ea120573-2eb4-495e-be48-1b2debac2640",
      email: "alex@example.com",
      passcode: "9876",
      name: "Alex",
    },
    {
      id: "2ee1c07c-7537-48f5-b5d8-8740e165cd62",
      email: "sachin@example.com",
      passcode: "1234",
      name: "Sachin",
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
