import NextAuth from 'next-auth';
import {authOptions} from '../../../../lib/auth-options';

const FIFTEEN_MINUTES = 900000;
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