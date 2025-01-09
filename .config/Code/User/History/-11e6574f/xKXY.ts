import { BasicInformationSchema } from "../infrastructure/basic-information.schema";
import { EventSchema } from "../infrastructure/event.schema";
import { BasicInformation } from "./basic-information"

export type EventJSON = {
    basicInformation: BasicInformation;
    is_published: boolean;
}


export class Event {

    private constructor(
        private _basicInformation: BasicInformation,
        private readonly _is_published: boolean,
    ) { }

    static ofJson(json: EventJSON): Event {
        return new Event(
            json.basicInformation,
            json.is_published,
        );
    }

    static ofDataModel(event: EventSchema): Event {
        return new Event(
            BasicInformation.ofDataModel(event.basicInformation),
            event.is_published,
        );
    }

    toDataModel(): EventSchema {
        const event = new EventSchema();
        console.log(this.basicInformation);
        event.basicInformation = BasicInformation.ofJson(this.basicInformation as BasicInfo);
        event.basicInformation = this.basicInformation.toDataModel();
        console.log(event.basicInformation);

        event.is_published = this.is_published;

        console.log(event);
        return event;
    }

    toJSON(): EventJSON {
        return {
            basicInformation: this.basicInformation,
            is_published: this.is_published,
        }
    }

    get basicInformation(): BasicInformation {
        return this._basicInformation;
    }

    get is_published(): boolean {
        return this._is_published;
    }

    set basicInformation(basicInformation: BasicInformation) {
        this._basicInformation = basicInformation;
    }

    toDatabase(): any {
    }


}