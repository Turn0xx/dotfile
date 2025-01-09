
export class InMemoryBasicInformationRepository implements BasicInformationRepository {

    private readonly basicInformations: BasicInformations[] = [];

    async save(basicInfo: BasicInformations): Promise<void> {
        this.basicInformations.push(basicInfo);
    }

    async getById(id: number): Promise<BasicInformations | undefined> {
        return this.basicInformations.find((basicInfo) => basicInfo.id === id);
    }

}