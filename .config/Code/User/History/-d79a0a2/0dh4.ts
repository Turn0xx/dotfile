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
    basicInfo: EventBasicInformation;
    place: EventPlace;
    date: EventDate;
    createdAt: Date;
}


export class EventBasicInformations {

    private constructor(
        private readonly id: number,
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
        return new EventBasicInformations(id, basicInfo, place, date, createdAt);
    }

    static fromJson(json: EventBasicInformationsJson): EventBasicInformations {
        return new EventBasicInformations(
            json.id,
            json.basicInfo,
            json.place,
            json.date,
            json.createdAt,
        );
    }

    static fromDataModel(dataModel: BasicInformationSchema): EventBasicInformations {
        return new EventBasicInformations(
            dataModel.id,
            {
                eventName: dataModel.eventName,
                eventTypes: dataModel.eventTypes,
                eventCategory: dataModel.eventCategory,
                tags: dataModel.tags,
            },
            {
                isOnline: dataModel.isOnline,
                address: dataModel.address,
                address2: dataModel.address2,
                city: dataModel.city,
                region: dataModel.region,
                zipCode: dataModel.zipCode,
                country: dataModel.country,
            },
            {
                startDate: dataModel.startDate,
                endDate: dataModel.endDate,
                timeZone: dataModel.timeZone,
            },
            dataModel.createdAt,
        );
    }

    toDataModel(): BasicInformationSchema {
        const basicInformation = new BasicInformationSchema();
        basicInformation.id = this.id;
        basicInformation.eventName = this.basicInfo.eventName;
        basicInformation.eventTypes = this.basicInfo.eventTypes;
        basicInformation.eventCategory = this.basicInfo.eventCategory;
        basicInformation.tags = this.basicInfo.tags;
        basicInformation.isOnline = this.place.isOnline;
        basicInformation.address = this.place.address;
        basicInformation.address2 = this.place.address2;
        basicInformation.city = this.place.city;
        basicInformation.region = this.place.region;
        basicInformation.zipCode = this.place.zipCode;
        basicInformation.country = this.place.country;
        basicInformation.startDate = this.date.startDate;
        basicInformation.endDate = this.date.endDate;
        basicInformation.timeZone = this.date.timeZone;
        basicInformation.createdAt = this.createdAt;
        return basicInformation;
    }

}