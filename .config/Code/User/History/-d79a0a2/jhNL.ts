import { BasicInformationSchema } from "../infrastructure/basic-information.schema";

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

export class BasicInformation {

    private constructor(
        private readonly _id: number,
        private readonly _organizerId: number,
        private readonly _basicInfo: EventBasicInformation,
        private readonly _place: EventPlace,
        private readonly _date: EventDate,
        private readonly _createdAt: Date,
    ) {}

    static ofJson(json: BasicInformationsJSON): BasicInformation {
        return new BasicInformation(
            json.id,
            json.organizerId,
            json.basicInfo,
            json.place,
            json.date,
            json.createdAt,
        );
    }

    static ofDataModel(basicInfo: BasicInformationSchema): BasicInformation {
        return new BasicInformation(
            basicInfo.id,
            basicInfo.organizerId,
            {
                eventName: basicInfo.eventName,
                eventTypes: basicInfo.eventTypes,
                eventCategory: basicInfo.eventCategory,
                tags: basicInfo.tags,
            },
            {
                isOnline: basicInfo.isOnline,
                address: basicInfo.address,
                address2: basicInfo.address2,
                city: basicInfo.city,
                region: basicInfo.region,
                zipCode: basicInfo.zipCode,
                country: basicInfo.country,
            },
            {
                startDate: basicInfo.startDate,
                endDate: basicInfo.endDate,
                timeZone: basicInfo.timeZone,
            },
            basicInfo.createdAt,
        );
    }

}