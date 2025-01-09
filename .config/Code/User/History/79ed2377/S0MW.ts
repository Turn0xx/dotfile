import { BasicInformationSchema } from '../infrastructure/basic-information.schema--';
import { EventSchema } from '../infrastructure/event.schema';
import {
  EventBasicInformation,
  EventBasicInformations,
  EventBasicInformationsJson,
} from './basic-information--';


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
            EventBasicInformations.fromDataModel(dataModel.basicInformation),
            dataModel.basicInformation.createdAt,
            dataModel.is_published,
        );
    }

    toDataModel(): EventSchema {
        const event = new EventSchema();
        event.id = this.id;
        event.is_published = this.isPublished;
        event.basicInformation = this.basicInformations.toDataModel();
        return event;
    }

    toJson(): EventJson {
        return {
            id: this.id,
            basicInformations: this.basicInformations,
            createdAt: this.createdAt,
            isPublished: this.isPublished,
        };
    }

    getId(): number {
        return this.id;
    }

    getBasicInformations(): EventBasicInformations {
        return this.basicInformations;
    }



}
