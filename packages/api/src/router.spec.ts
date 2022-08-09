import { v4 as uuid } from "uuid";
import { User, Company } from "./database";
import { appRouter, Context } from "./router";

const mock = {
  user: (params: Partial<User> = {}): User => ({
    id: uuid(),
    email: "jd@blad.com",
    passcode: "1234",
    name: "John",
    ...params,
  }),
  company: (params: Partial<Company> = {}): Company => ({
    id: Math.round(Math.random() * 1000),
    tickerCode: "AAPL",
    name: "Apple",
    ...params,
  }),
  context: (params: Partial<Context> = {}): Context => ({
    user: mock.user(),
    requestId: uuid(),
    ...params,
  }),
};

describe("appRouter", () => {
  describe("authRouter", () => {
    it("can register a user", async () => {
      const app = appRouter.createCaller(mock.context());
      const user = mock.user();
      const response = await app.mutation("register", user);

      expect(response.user.id).toBeDefined();
    });

    it("can login a user", async () => {
      const app = appRouter.createCaller(mock.context());
      const user = mock.user();

      const response = await app.mutation("login", {
        email: user.email,
        passcode: user.passcode,
      });

      expect(response.token).toBeDefined();
    });
  });

  describe("companyRouter", () => {
    it("can list companies", async () => {
      const app = appRouter.createCaller(mock.context());
      const response = await app.query("getCompanies", {});

      expect(response.companies).toBeDefined();
    });

    it("can create a company", async () => {
      const app = appRouter.createCaller(mock.context());
      const company = mock.company();
      const response = await app.mutation("createCompany", company);

      expect(response.company.id).toBeDefined();
    });
  });
});