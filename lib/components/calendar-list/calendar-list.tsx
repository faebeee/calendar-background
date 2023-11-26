'use client'

import {Checkbox, List, ListItem} from "@dreipol/t3-ui";
import {useSelectionList} from "@dreipol/t3-react-utils";
import {useEffect} from "react";
import {useCalendarContext} from "../../context/calendar-context";
import {Calendar} from "../../types/calendar";


export type CalendarListProps = {
    calendars: Calendar[]
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