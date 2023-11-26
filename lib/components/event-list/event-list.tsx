'use client'

import {Button, ContextChip, Stack, Typography} from "@dreipol/t3-ui";
import {formatDateRange, formatDuration} from "../../format-date";
import {useEventsApi} from "../../hooks/use-events-api";
import {useCalendarContext} from "../../context/calendar-context";
import {formatISO} from "date-fns";

export const EventList = () => {
    const calContext = useCalendarContext()
    const {events} = useEventsApi(calContext.ids)

    return <Stack direction={'column'} spacing={'48px'} crossAxis={"center"} mainAxis={"center"}>
        {events.map((event) => <Stack direction={'column'} mainAxis={'center'}>
            <Typography variant={'eventHeading'} color={'primary.light'}>{event.summary}</Typography>
            {event.location && <Typography color={'primary.light'}>{event.location}</Typography>}
            <Typography>
                {event.start.dateTime && event.end.dateTime && formatDateRange(event.start.dateTime, event.end.dateTime)}
            </Typography>

            <Typography>
                {event.start.date && event.end.date && formatDateRange(event.start.date, event.end.date)}
            </Typography>

            <Typography>Organizer: {event.organizer.displayName ?? event.organizer.email}</Typography>

            <Stack>
                <ContextChip color={'secondary'}>Starts
                    in {(event.start.dateTime || event.start.date) && formatDuration(formatISO(new Date()), event.start.dateTime ?? event.start.date)}</ContextChip>
                <ContextChip
                    color={'secondary'}>Takes {event.start.dateTime && event.end.dateTime && formatDuration(event.start.dateTime, event.end.dateTime)}</ContextChip>
            </Stack>


            <a href={event.htmlLink} target={'_blank'}>
                <Button variant={'text'} color={'primary'}>Open</Button>
            </a>
        </Stack>)}
    </Stack>
}