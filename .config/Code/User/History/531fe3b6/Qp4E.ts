import { EventBasicInformationsJson } from "../domain/basic-information";

export interface BasicInformationRepository {
    save(basicInfo: EventBasicInformationsJson): Promise<void>;
}