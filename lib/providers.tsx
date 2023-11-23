'use client'

import {ThemeProvider} from "@dreipol/t3-react-theme";
import {PropsWithChildren} from "react";
import {SessionProvider} from "next-auth/react"

export type ProvidersProps = PropsWithChildren<{}>

export const Providers = ({children}: ProvidersProps) => {
    return <ThemeProvider addToBody>
        <SessionProvider>
            {children}
        </SessionProvider>
    </ThemeProvider>
}
