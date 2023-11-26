export interface Calendar {
    kind: string
    etag: string
    id: string
    summary: string
    description?: string
    timeZone: string
    colorId: string
    backgroundColor: string
    foregroundColor: string
    selected: boolean
    accessRole: string
    defaultReminders: DefaultReminder[]
    conferenceProperties: ConferenceProperties
    notificationSettings?: NotificationSettings
    primary?: boolean
}

export interface DefaultReminder {
    method: string
    minutes: number
}

export interface ConferenceProperties {
    allowedConferenceSolutionTypes: string[]
}

export interface NotificationSettings {
    notifications: Notification[]
}

export interface Notification {
    type: string
    method: string
}
