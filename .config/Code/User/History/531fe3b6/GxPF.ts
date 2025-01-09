import { EventBasicInformations } from "../domain/basic-information";

export interface BasicInformationRepository {
    save(basicInfo: EventBasicInformations): Promise<void>;
}