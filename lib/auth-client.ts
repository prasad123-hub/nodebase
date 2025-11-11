import { polarClient } from '@polar-sh/better-auth';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  plugins: [polarClient()],
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL as string,
  hooks: {
    onAuthError: (error: Error) => {
      console.error(error);
    },
  },
});

export const { useSession, signIn, signUp, signOut, checkout, customer } = authClient;
