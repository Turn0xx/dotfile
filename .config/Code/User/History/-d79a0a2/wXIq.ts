
export type EventBasicInformation = {
    eventName: string;
    eventTypes: string[];
    eventCategory: string;
    tags: string[];
}

export type EventPlace = {
    isOnline: boolean;
    address?: string;
    address2?: string;
    city?: string;
    region?: string;
    zipCode?: string;
    country?: string;
}

export type EventDate = {
    startDate: Date;
    endDate: Date;
    timeZone: string;
}

export type BasicInformationsJSON = {
    id: number;
    organizerId: number;
    basicInfo: EventBasicInformation;
    place: EventPlace;
    date: EventDate;
    createdAt: Date;
}

export class BasicInformation