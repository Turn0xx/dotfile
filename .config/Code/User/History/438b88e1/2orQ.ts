import { Organizer } from "../domain/organizer";

export const organizerBuilder = ({
    id = 1,
    organizationName = 'organizationName',
    email = 'alice@gmail.com',
    password = 'password',
    username = 'Alic0x',
    organizationAddress = '8 Rue Jean Heanri Schnitzler, France',
    phoneNumber = '+33636518875',
    createdAt = new Date("2023-01-01T10:30:00.000Z"),
}: Partial<Organizer> = {}): Organizer => {
    const props = {

    }
}