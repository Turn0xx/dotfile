
interface BasicInformationRepository {
    save(basicInfo: BasicInformations): Promise<void>;
}