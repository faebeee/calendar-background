'use client'

import {Checkbox, List, ListItem} from "@dreipol/t3-ui";
import {Schema$CalendarListEntry} from "googleapis/build/src/apis/calendar/v3";
import {useSelectionList} from "@dreipol/t3-react-utils";
import {useEffect} from "react";
import {useCalendarContext} from "../../context/calendar-context";


export type CalendarListProps = {
    calendars: Schema$CalendarListEntry[]
}
export const CalendarList = ({calendars}: CalendarListProps) => {
    const calContext = useCalendarContext()
    const list = useSelectionList<string>(calContext.ids);

    useEffect(() => {
        list.setList(calContext.ids)
    }, [calContext.ids]);

    return <List>
        {calendars.map((c) => (
            <ListItem key={c.id} prefix={<Checkbox onChange={() => calContext.toggleItem(c.id)}
                                                   checked={list.has(c.id)}/>}>{c.summary}</ListItem>
        ))}
    </List>
}