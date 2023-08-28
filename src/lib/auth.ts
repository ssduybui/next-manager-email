import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    // Secret for Next-auth, without this JWT encryption/decryption won't work
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        maxAge: 12 * 60 * 60, // 30 days
    },
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "",
            credentials: {
                name: { label: "user name", type: "text", placeholder: "Jame smith", readOnly: true },
                email: { label: "full name", type: "email", placeholder: "jamesmith", readOnly: true },
                password: { label: "Password", type: "password", readOnly: true }
            },
            async authorize(credentials, req): Promise<any> {
                
                if (credentials?.name) {
                    return credentials
                } else {
                    return null
                }
            }
        }),

        /* GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
            version: "2.0", // opt-in to Twitter OAuth 2.0
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
        }), */
    ],
};