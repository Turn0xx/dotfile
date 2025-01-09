import { EventBasicInformation } from "./basic-information";

export type Event = {
    id: number;
    basicInformations: EventBasicInformation;
    createdAt: Date;
    isPublished: boolean;
}