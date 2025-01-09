import { Organizer } from "../domain/organizer";

export const organizerBuilder = ({
    id = 1,
    organizationName = 'organizationName',
    email = 'alice@gmail.com',
    password = 'password',
    username = 'Alice',
    organizationAddress = 'organizationAddress',
    phoneNumber = '+33636518875',
    createdAt = new Date("2023-01-01T10:30:00.000Z"),
}: Partial<Organizer> = {}): Organizer => {
    const props = {

    }
}