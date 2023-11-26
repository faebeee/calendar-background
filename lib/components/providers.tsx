'use client'

import {ThemeProvider} from "@dreipol/t3-react-theme";
import {PropsWithChildren, useEffect} from "react";
import {SessionProvider} from "next-auth/react"
import {theme} from "../theme";
import {CalendarContext} from "../context/calendar-context";
import {useLocalStorage} from "react-use";
import {useSelectionList} from "@dreipol/t3-react-utils";

export type ProvidersProps = PropsWithChildren<{}>

export const Providers = ({children}: ProvidersProps) => {
    const [value, setValue, remove] = useLocalStorage('calendars', '[]');
    const list = useSelectionList<string>(JSON.parse(value ?? '[]'));

    useEffect(() => {
        setValue(JSON.stringify(list.list))
    }, [list.list]);

    return <ThemeProvider addToBody theme={theme}>
        <SessionProvider>
            <CalendarContext.Provider value={{ids: list.list, toggleItem: list.toggleItem}}>
                {children}
            </CalendarContext.Provider>
        </SessionProvider>
    </ThemeProvider>
}
