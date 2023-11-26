import {getServerSession} from "next-auth";
import {SessionData} from "googleapis-common/build/src/http2";
import {redirect} from "next/navigation";
import {
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    Dialog,
    MainColumnLayout,
    Stack,
    Typography
} from "@dreipol/t3-ui";
import {formatDate} from "../lib/format-date";
import {authOptions} from "./api/auth/[...nextauth]/route";
import {AppBar} from "../lib/components/app-bar";
import {EventList} from "../lib/components/event-list/event-list";
import {getCalendars} from "../lib/services/get-calendars";
import {CalendarList} from "../lib/components/calendar-list/calendar-list";

export default async function Home() {
    const session = (await getServerSession(authOptions)) as SessionData;

    if (!session) {
        return redirect('/api/auth/signin');
    }

    const calendars = await getCalendars();

    return (<MainColumnLayout>
            <AppBar calendars={calendars}/>
            <Stack direction={'column'} fullWidth mainAxis={'spread'}>
                <Typography color={'primary'} variant={'mainHeading'} center
                            as={'h1'}>{formatDate(new Date().toISOString())}</Typography>



                <EventList/>
            </Stack>
        </MainColumnLayout>
    )
}
