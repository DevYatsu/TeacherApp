import { login } from "@/lib/login";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        try {
          const user = await login(credentials.username, credentials.password);
          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    signOut: "/admin/logout",
  },
};

export default authOptions;
