import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "read:user user:email repo delete_repo",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token;

                if (profile) {
                    token.name = profile.name
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;

            if (session.user) {
                if (token.name) {
                    session.user.name = token.name as string;
                }
            }

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
};