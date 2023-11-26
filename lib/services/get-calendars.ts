import {getServerSession} from "next-auth";
import {authOptions} from "../../app/api/auth/[...nextauth]/route";
import {SessionData} from "googleapis-common/build/src/http2";
import {google} from "googleapis";
import {getGoogleAuth} from "../get-google-client";
import {Schema$CalendarListEntry} from "googleapis/build/src/apis/calendar/v3";

export const getCalendars = async (): Promise<Schema$CalendarListEntry[]> => {
    const session = (await getServerSession(authOptions)) as SessionData;

    const calendar = google.calendar({version: 'v3', auth: getGoogleAuth(session.accessToken, session.refreshToken)});
    const calendarResponse = await calendar.calendarList.list({})
    return calendarResponse.data.items!
}