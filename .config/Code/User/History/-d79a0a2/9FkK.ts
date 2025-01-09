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

export type EventBasicInformationsJson = {
    id: number;
    organizerId: number;
    basicInfo: EventBasicInformation;
    place: EventPlace;
    date: EventDate;
    createdAt: Date;
}


export class EventBasicInformations {

    private constructor(
        private readonly id: number,
        private organizerId: number,
        private basicInfo: EventBasicInformation,
        private place: EventPlace,
        private date: EventDate,
        private readonly createdAt: Date,
    ) { }


    static create(
        id: number,
        organizerId: number,
        basicInfo: EventBasicInformation,
        place: EventPlace,
        date: EventDate,
        createdAt: Date,
    ): EventBasicInformations {
        return new EventBasicInformations(id, organizerId, basicInfo, place, date, createdAt);
    }

    static fromJson(json: EventBasicInformationsJson): EventBasicInformations {
        return new EventBasicInformations(
            json.id,
            json.organizerId,
            json.basicInfo,
            json.place,
            json.date,
            json.createdAt,
        );
    }

    static fromDataModel(dataModel: BasicInformationSchema): EventBasicInformations {
        return new EventBasicInformations(
            dataModel.id,
            dataModel
        );
    }

}