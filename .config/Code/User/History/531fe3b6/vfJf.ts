import { BasicInformations } from "../domain/basic-information";

interface BasicInformationRepository {
    save(basicInfo: BasicInformations): Promise<void>;
}