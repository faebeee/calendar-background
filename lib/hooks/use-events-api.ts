import {useResource} from "@dreipol/t3-api-utils";
import {CalendarEvent} from "../types/calendar-event";

export const useEventsApi = (ids: string[]) => {
    const eventApi = useResource<CalendarEvent[]>({
        url: `/api/events`,
        params: {
            calendars: ids,
            limit: 3,
        },
    });


    return {
        isLoading: eventApi.isLoading,
        events: eventApi.data ?? []
    }
}