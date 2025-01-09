/*import { BasicInformationRepository } from "../application/basic-information.repository";
import { EventBasicInformationsJson } from "../domain/basic-information";

export class InMemoryBasicInformationRepository implements BasicInformationRepository {

    private readonly basicInformations: EventBasicInformationsJson[] = [];

    async save(basicInfo: EventBasicInformationsJson): Promise<void> {
        this.basicInformations.push(basicInfo);
    }

    async getById(id: number): Promise<EventBasicInformationsJson | undefined> {
        return this.basicInformations.find((basicInfo) => basicInfo.id === id);
    }

}*/