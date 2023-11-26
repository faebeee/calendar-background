import {useResource} from "@dreipol/t3-api-utils";
import {Params$Resource$Events$Instances} from "googleapis/build/src/apis/calendar/v3";

export const useEventsApi = (ids: string[]) => {
    const eventApi = useResource<Params$Resource$Events$Instances[]>({
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