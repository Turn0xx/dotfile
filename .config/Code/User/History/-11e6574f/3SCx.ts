import {
  EventBasicInformation,
  EventBasicInformations,
} from './basic-information';


export type EventJson = {
  id: number;
  basicInformations: EventBasicInformations;
  createdAt: Date;
  isPublished: boolean;
};

export class Event {
  private constructor(
    private readonly id: number,
    private basicInformations: EventBasicInformations,
    private readonly createdAt: Date,
    private isPublished: boolean,
  ) {}

    static create(
        id: number,
        basicInformations: EventBasicInformations,
        createdAt: Date,
        isPublished: boolean,
    ): Event {
        return new Event(id, basicInformations, createdAt, isPublished);
    }

    static fromJson(json: EventJson): Event {
        return new Event(
            json.id,
            json.basicInformations,
            json.createdAt,
            json.isPublished,
        );
    }

    static fromDataModel(dataModel: EventSchema): Event {
        return new Event(
            dataModel.id,
            dataModel.basicInformations,
            dataModel.createdAt,
            dataModel.isPublished,
        );
    }



}
