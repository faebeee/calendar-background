import {getServerSession} from "next-auth";
import {SessionData} from "googleapis-common/build/src/http2";
import {google} from "googleapis";
import {getGoogleAuth} from "../get-google-client";
import {authOptions} from "../auth-options";
import {Calendar} from "../types/calendar";

export const getCalendars = async (): Promise<Calendar[]> => {
    // @ts-ignore
    const session = (await getServerSession(authOptions)) as SessionData;

    // @ts-ignore
    const calendar = google.calendar({version: 'v3', auth: getGoogleAuth(session.accessToken, session.refreshToken)});
    const calendarResponse = await calendar.calendarList.list({})
    return calendarResponse.data.items! as Calendar[]
}