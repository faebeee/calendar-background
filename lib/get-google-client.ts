import {google} from 'googleapis';
import {OAuth2Client} from 'google-auth-library';

export const getGoogleAuth = (accessToken:string, refreshToken:string): OAuth2Client => {

    const oauth2Client = new google.auth.OAuth2({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: process.env.NEXTAUTH_URL
    })

    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken
    })

    return oauth2Client;
};