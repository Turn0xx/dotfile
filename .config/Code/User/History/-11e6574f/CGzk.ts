import { EventBasicInformation, EventPlace, EventDate } from "./basic-information";

export type Event = {
    id: number;
    basicInfo: EventBasicInformation;
    place: EventPlace;
    date: EventDate;
    createdAt: Date;
}