import {createContext, useContext} from "react";

export type CalendarContextValue = {
    ids: string[],
    toggleItem: (ids: string) => void
}

export const CalendarContext = createContext<CalendarContextValue>({
    ids: [],
    toggleItem: () => {
    }
})

export const useCalendarContext = () => useContext(CalendarContext)