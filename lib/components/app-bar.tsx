'use client'
import {
    AppBar as UIAppBar,
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    Dialog,
    Stack,
    Typography
} from "@dreipol/t3-ui";
import {signOut, useSession} from "next-auth/react";
import {CalendarList} from "./calendar-list/calendar-list";
import {useState} from "react";
import {Calendar} from "../types/calendar";

export const AppBar = ({calendars}: { calendars: Calendar[] }) => {
    const {status} = useSession()
    const [openDialog, setDialogOpen] = useState(false)

    return <>
        <UIAppBar right={status === 'authenticated' && <Stack>
            <Button color={'primary'} variant={'text'} onClick={() => signOut()}>Sign Out</Button>
            <Button onClick={() => setDialogOpen(true)}>Calendars</Button>
        </Stack>}>
        </UIAppBar>

        <Dialog as={'div'} open={openDialog} onClose={() => setDialogOpen(false)}>
            <Card>
                <CardHeader divider><Typography variant={'headingLarge'}>Calendars</Typography></CardHeader>
                <CardContent>
                    <CalendarList calendars={calendars}/>
                </CardContent>
                <CardFooter divider>
                    <Button onClick={() => setDialogOpen(false)} color={'primary'}>Apply</Button>
                </CardFooter>
            </Card>
        </Dialog>
    </>

}
