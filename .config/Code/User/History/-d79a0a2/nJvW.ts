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
    basicInfo: EventBasicInformation;
    place: EventPlace;
    date: EventDate;
    createdAt: Date;
}

export class BasicInformation {

    private constructor(
        private readonly _id: number,
        private readonly _basicInfo: EventBasicInformation,
        private readonly _place: EventPlace,
        private readonly _date: EventDate,
        private readonly _createdAt: Date,
    ) {}

    static ofJson(json: BasicInformationsJSON): BasicInformation {
        return new BasicInformation(
            json.id,
            json.basicInfo,
            json.place,
            json.date,
            json.createdAt,
        );
    }

    static ofDataModel(basicInfo: BasicInformationSchema): BasicInformation {
        return new BasicInformation(
            basicInfo.id,
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

    toDataModel(): BasicInformationSchema {
        const basicInfo = new BasicInformationSchema();
        basicInfo.id = this.id;
        basicInfo.eventName = this.eventName;
        basicInfo.eventTypes = this.eventTypes;
        basicInfo.eventCategory = this.eventCategory;
        basicInfo.tags = this.tags;
        basicInfo.isOnline = this.isOnline;
        basicInfo.address = this.address;
        basicInfo.address2 = this.address2;
        basicInfo.city = this.city;
        basicInfo.region = this.region;
        basicInfo.zipCode = this.zipCode;
        basicInfo.country = this.country;
        basicInfo.startDate = this.startDate;
        basicInfo.endDate = this.endDate;
        basicInfo.timeZone = this.timeZone;
        basicInfo.createdAt = this.createdAt;
        return basicInfo;
    }

    get id(): number {
        return this._id;
    }

    get eventName(): string {
        return this._basicInfo.eventName;
    }

    get eventTypes(): string[] {
        return this._basicInfo.eventTypes;
    }

    get eventCategory(): string {
        return this._basicInfo.eventCategory;
    }

    get tags(): string[] {
        return this._basicInfo.tags;
    }

    get isOnline(): boolean {
        return this._place.isOnline;
    }

    get address(): string {
        return this._place.address;
    }

    get address2(): string {
        return this._place.address2;
    }

    get city(): string {
        return this._place.city;
    }

    get region(): string {
        return this._place.region;
    }

    get zipCode(): string {
        return this._place.zipCode;
    }

    get country(): string {
        return this._place.country;
    }

    get startDate(): Date {
        return this._date.startDate;
    }

    get endDate(): Date {
        return this._date.endDate;
    }

    get timeZone(): string {
        return this._date.timeZone;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    toJSON(): BasicInformationsJSON {
        return {
            id: this._id,
            basicInfo: this._basicInfo,
            place: this._place,
            date: this._date,
            createdAt: this._createdAt,
        }
    }
}