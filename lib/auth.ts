import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "./db";

export const auth = betterAuth({
  database: mongodbAdapter(db),

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
});
