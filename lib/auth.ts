import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { client, db } from "./db";
import { cache } from "react";
import { headers } from "next/headers";
import { User, UserId } from "@/types/user";

const baseURL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3010";

export const auth = betterAuth({
  baseURL,
  trustedOrigins: [
    baseURL,
    "http://localhost:3010",
    "http://127.0.0.1:3010",
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ],
  database: mongodbAdapter(db, {
    client,
    transaction: false, // required for standalone MongoDB (no replica set)
  }),
  plugins: [nextCookies()],

  emailAndPassword: {
    enabled: true,
  },

  session: {
    expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
  },

  cookies: {
    sessionToken: {
      // Max-Age in seconds, must not exceed 400 days (34560000 seconds)
      // 7 days = 604800 seconds, which is safe
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
});

export const getCurrentUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: (await headers()) as HeadersInit,
  });

  if (!session?.user) return null;

  const currentUser: User = {
    id: session.user.id as UserId,
    email: session.user.email,
    name: session.user.name,
    emailVerified: session.user.emailVerified,
    createdAt: session.user.createdAt,
    updatedAt: session.user.updatedAt,
  };

  return currentUser;
});
