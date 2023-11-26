

export interface CalendarEvent {
    kind: string
    etag: string
    id: string
    status: string
    htmlLink: string
    created: string
    updated: string
    summary: string
    creator: Creator
    organizer: Organizer
    start: Start
    end: End
    recurringEventId?: string
    originalStartTime?: OriginalStartTime
    iCalUID: string
    sequence: number
    reminders: Reminders
    eventType: string
    description?: string
    attendees?: Attendee[]
    transparency?: string
    hangoutLink?: string
    conferenceData?: ConferenceData
    guestsCanModify?: boolean
    location?: string
    extendedProperties?: ExtendedProperties
    colorId?: string
}

export interface Creator {
    email: string
    self?: boolean
    displayName?: string
}

export interface Organizer {
    email: string
    self?: boolean
    displayName?: string
}

export interface Start {
    dateTime?: string
    timeZone?: string
    date?: string
}

export interface End {
    dateTime?: string
    timeZone?: string
    date?: string
}

export interface OriginalStartTime {
    dateTime?: string
    timeZone?: string
    date?: string
}

export interface Reminders {
    useDefault: boolean
}

export interface Attendee {
    email: string
    responseStatus: string
    comment?: string
    organizer?: boolean
    self?: boolean
    displayName?: string
    resource?: boolean
}

export interface ConferenceData {
    entryPoints: EntryPoint[]
    conferenceSolution: ConferenceSolution
    conferenceId: string
}

export interface EntryPoint {
    entryPointType: string
    uri: string
    label?: string
    pin?: string
    regionCode?: string
}

export interface ConferenceSolution {
    key: Key
    name: string
    iconUri: string
}

export interface Key {
    type: string
}

export interface ExtendedProperties {
    private: Private
}

export interface Private {
    RoomReleaseEventDeclineProcessedOrganizer: string
}
