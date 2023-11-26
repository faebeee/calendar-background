import {getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]/route";
import {SessionData} from "googleapis-common/build/src/http2";
import {google} from "googleapis";
import {getGoogleAuth} from "../../../lib/get-google-client";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const session = (await getServerSession(authOptions)) as SessionData;

    const calendars = new URL(request.url).searchParams.getAll('calendars[]')
    const limit = parseInt(new URL(request.url).searchParams.get('limit') ?? '3') ?? 3;

    const calendar = google.calendar({version: 'v3', auth: getGoogleAuth(session.accessToken, session.refreshToken)});
    const calendarResponse = await calendar.calendarList.list({})
    const events = await Promise.all(
        calendars.map((cid) => calendar.events.list({
            calendarId: cid,
            timeMin: new Date().toISOString(),
            maxResults: limit,
            singleEvents: true,
            orderBy: 'startTime',
        })
            .then((res) => res.data.items)))
        .then(res => {
            return res.reduce((acc, e) => {
                return [...acc!, ...e!]
            }, [])
        })


    const sortedEvents = events!.sort((a, b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.start.dateTime ?? a.start.date) - new Date(b.start.dateTime ?? b.start.date);
    });

    return Response.json(sortedEvents.splice(0, limit));
}