import { authOptions } from "@/lib/auth"
import NextAuth, { getServerSession } from "next-auth"

const handler = NextAuth({
    ...authOptions,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {

                return true;
            } else {
                return false
            }
        },

        async redirect({ url, baseUrl }) {
            return process.env.NEXTAUTH_REDIRECT + "/" + "signup-email"
        },

    }
})

export { handler as GET, handler as POST }