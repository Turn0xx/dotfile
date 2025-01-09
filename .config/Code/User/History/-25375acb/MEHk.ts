import { BasicInformationRepository } from "../application/basic-information.repository";
import { EventBasicInformations } from "../domain/basic-information";

export class InMemoryBasicInformationRepository implements BasicInformationRepository {

    private readonly basicInformations: EventBasicInformations[] = [];

    async save(basicInfo: EventBasicInformations): Promise<void> {
        this.basicInformations.push(basicInfo);
    }

    async getById(id: number): Promise<EventBasicInformations | undefined> {
        return this.basicInformations.find((basicInfo) => basicInfo.id === id);
    }

}