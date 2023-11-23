import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {TokenSet} from "openid-client";

const scopes = [
    'openid',
    'https://www.googleapis.com/auth/calendar.readonly',
];

const FIFTEEN_MINUTES = 900000;
export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET!,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                    scope: scopes.join(' '),
                },
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({}) {
            return true;
        },
        // @ts-ignore
        async redirect({baseUrl}) {
            return baseUrl;
        },
        // @ts-ignore
        async session({session, token, user}) {
            session.accessToken = token.access_token;
            session.refreshToken = token.refresh_token;
            return session;
        },
        // @ts-ignore
        async jwt({token, trigger, user, account, profile, isNewUser, session}) {
            if (account) {
                // Save the access token and refresh token in the JWT on the initial login
                return {
                    access_token: account.access_token,
                    expires_at: Math.floor(Date.now() / 1000 + account.expires_in),
                    refresh_token: account.refresh_token,
                }
            } else if (Date.now() < token.expires_at * 1000) {
                // If the access token has not expired yet, return it
                return token
            } else {
                // If the access token has expired, try to refresh it
                try {
                    // https://accounts.google.com/.well-known/openid-configuration
                    // We need the `token_endpoint`.
                    const response = await fetch("https://oauth2.googleapis.com/token", {
                        headers: {"Content-Type": "application/x-www-form-urlencoded"},
                        body: new URLSearchParams({
                            client_id: process.env.GOOGLE_CLIENT_ID!,
                            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                            grant_type: "refresh_token",
                            refresh_token: token.refresh_token,
                        }),
                        method: "POST",
                    })

                    const tokens: TokenSet = await response.json()

                    if (!response.ok) throw tokens

                    return {
                        ...token, // Keep the previous token properties
                        access_token: tokens.access_token,
                    // @ts-ignore
                        expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
                        // Fall back to old refresh token, but note that
                        // many providers may only allow using a refresh token once.
                        refresh_token: tokens.refresh_token ?? token.refresh_token,
                    }
                } catch (error) {
                    console.error("Error refreshing access token", error)
                    // The error property will be used client-side to handle the refresh token error
                    return {...token, error: "RefreshAccessTokenError" as const}
                }
            }
        },
    },
};
// @ts-ignore
const handler = NextAuth({
    ...authOptions,
});

export {handler as GET, handler as POST};

async function refreshAccessToken(token: { refreshToken: string }) {
    try {
        const url =
            'https://oauth2.googleapis.com/token?' +
            new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID as string,
                client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken,
            });

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            idToken: refreshedTokens.id_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        console.log(error)
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
}