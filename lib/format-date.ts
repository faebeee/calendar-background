import {
    differenceInHours,
    differenceInMinutes,
    format,
    formatDistance,
    formatDuration as formatDurationDateFns
} from "date-fns"

export const formatDate = (date: string) => {
    return format(new Date(date), 'dd.MM.yyyy HH:mm')
}

export const formatDateRange = (start: string, end: string) => {
    return `${formatDate(start)} - ${formatDate(end)}`
}
export const formatDuration = (start: string, end: string) => {
    return formatDistance(new Date(end), new Date(start))
}