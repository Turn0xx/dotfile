import { EventBasicInformation, EventBasicInformations } from "./basic-information";

export type Event = {
    id: number;
    basicInformations: EventBasicInformations;
    createdAt: Date;
    isPublished: boolean;
}