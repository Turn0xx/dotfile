import { EventBasicInformation } from "./basic-information";

export type Event = {
    id: number;
    basicInfo: EventBasicInformation;
    createdAt: Date;
}