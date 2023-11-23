import {listEvents} from "@/lib/get-events";
import {getGoogleAuth} from "@/lib/get-google-client";
import {getSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {SessionData} from "googleapis-common/build/src/http2";
import {redirect} from "next/navigation";
import {google} from "googleapis";

export default async function Home() {
    const session = (await getServerSession(authOptions)) as SessionData;

    if (!session) {
        return redirect('/api/auth/signin');
    }


    const calendar = google.calendar({version: 'v3', auth: getGoogleAuth(session.accessToken, session.refreshToken)});
    const res = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    });

    console.log(res.data)
    return (<main>
            Hello World
        </main>
    )
}
