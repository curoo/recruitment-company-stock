import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import jwt from "jsonwebtoken";
import { OpenApiMeta } from "trpc-openapi";
import { v4 as uuid } from "uuid";
import { z } from "zod";

import { User, Company, database } from "./database";

const jwtSecret = uuid();

export type Context = {
  user: User | null;
  requestId: string;
};

export const createContext = async ({
  req,
  res,
}: // eslint-disable-next-line @typescript-eslint/require-await
CreateExpressContextOptions): Promise<Context> => {
  const requestId = uuid();
  res.setHeader("x-request-id", requestId);

  let user: User | null = null;

  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const userId = jwt.verify(token, jwtSecret) as string;
      if (userId) {
        user = database.users.find((_user) => _user.id === userId) ?? null;
      }
    }
  } catch (cause) {
    console.error(cause);
  }

  return { user, requestId };
};

const createRouter = () => {
  return trpc.router<Context, OpenApiMeta>();
};

const createProtectedRouter = () => {
  return createRouter().middleware(({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({
        message: "User not found",
        code: "UNAUTHORIZED",
      });
    }
    return next({ ctx: { ...ctx, user: ctx.user } });
  });
};

const authRouter = createRouter()
  .mutation("register", {
    meta: {
      openapi: {
        enabled: true,
        method: "POST",
        path: "/auth/register",
        tags: ["auth"],
        summary: "Register as a new user",
      },
    },
    input: z.object({
      email: z.string().email(),
      passcode: z.string().regex(/^[0-9]{4}$/),
      name: z.string().min(3),
    }),
    output: z.object({
      user: z.object({
        id: z.string().uuid(),
        email: z.string().email(),
        name: z.string().min(3),
      }),
    }),
    resolve: ({ input }) => {
      let user = database.users.find((_user) => _user.email === input.email);

      if (user) {
        throw new TRPCError({
          message: "User with email already exists",
          code: "UNAUTHORIZED",
        });
      }

      user = {
        id: uuid(),
        email: input.email,
        passcode: input.passcode,
        name: input.name,
      };

      database.users.push(user);

      return { user: { id: user.id, email: user.email, name: user.name } };
    },
  })
  .mutation("login", {
    meta: {
      openapi: {
        enabled: true,
        method: "POST",
        path: "/auth/login",
        tags: ["auth"],
        summary: "Login as an existing user",
      },
    },
    input: z.object({
      email: z.string().email(),
      passcode: z.string().regex(/^[0-9]{4}$/),
    }),
    output: z.object({
      token: z.string(),
    }),
    resolve: ({ input }) => {
      const user = database.users.find((_user) => _user.email === input.email);

      if (!user) {
        throw new TRPCError({
          message: "User with email not found",
          code: "UNAUTHORIZED",
        });
      }
      if (user.passcode !== input.passcode) {
        throw new TRPCError({
          message: "Passcode was incorrect",
          code: "UNAUTHORIZED",
        });
      }

      return {
        token: jwt.sign(user.id, jwtSecret),
      };
    },
  });

const companyRouter = createRouter().query("getCompanies", {
  meta: {
    openapi: {
      enabled: true,
      method: "GET",
      path: "/companies",
      tags: ["companies"],
      summary: "Read all companies",
    },
  },
  input: z.object({}),
  output: z.object({
    companies: z.array(
      z.object({
        id: z.number(),
        tickerCode: z.string(),
        name: z.string(),
      })
    ),
  }),
  resolve: () => {
    return { companies: database.companies };
  },
});

const companyProtectedRouter = createProtectedRouter().mutation("createCompany", {
  meta: {
    openapi: {
      enabled: true,
      method: "POST",
      path: "/companies",
      tags: ["companies"],
      protect: true,
      summary: "Create a new company",
    },
  },
  input: z.object({
    tickerCode: z.string().min(1).max(10),
    name: z.string().min(1).max(50),
  }),
  output: z.object({
    company: z.object({
      id: z.number(),
      tickerCode: z.string(),
      name: z.string(),
    }),
  }),
  resolve: ({ input, ctx }) => {
    const company: Company = {
      id: database.companies.length + 1,
      tickerCode: input.tickerCode,
      name: input.name,
    };

    database.companies.push(company);

    return { company };
  },
});

/* prettier-ignore */
export const appRouter = createRouter()
  .merge(authRouter)
  .merge(companyRouter)
  .merge(companyProtectedRouter);

export type AppRouter = typeof appRouter;
