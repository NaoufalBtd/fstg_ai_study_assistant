import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("hitted");
        const res = await axios.post<IUser>(
          `http://localhost:3000/api/user/login`,
          {
            email: credentials?.email,
            password: credentials?.password,
          },
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        );
        const user = res.data.payload;
        if (user && res) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.name = user.fullName;
      }
      return token;
    },
    async session({ token, session }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});

interface IUser {
  payload: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
