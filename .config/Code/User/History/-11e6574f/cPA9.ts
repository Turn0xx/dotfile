import { BasicInformationSchema } from '../infrastructure/basic-information.schema';
import { EventSchema } from '../infrastructure/event.schema';
import {
  EventBasicInformation,
  EventBasicInformations,
  EventBasicInformationsJson,
} from './basic-information';


export type EventJson = {
  id: number;
  basicInformations: EventBasicInformationsJson;
  createdAt: Date;
  isPublished: boolean;
};

export class Event {
  private constructor(
    private readonly id: number,
    private basicInformations: EventBasicInformationsJson,
    private readonly createdAt: Date,
    private isPublished: boolean,
  ) {}

    static create(
        id: number,
        basicInformations: EventBasicInformationsJson,
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
            EventBasicInformations.fromDataModel(dataModel.basicInformation).,
            dataModel.basicInformation.createdAt,
            dataModel.is_published,
        );
    }

    toDataModel(): EventSchema {
        const event = new EventSchema();
        event.id = this.id;
        event.basicInformation = this.basicInformations;
        event.createdAt = this.createdAt;
        event.isPublished = this.isPublished;
        return event;
    }



}
