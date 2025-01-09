import { BasicInformations } from "../domain/basic-information";

export interface BasicInformationRepository {
    save(basicInfo: BasicInformations): Promise<void>;
}