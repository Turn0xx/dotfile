export const organizerBuilder = ({

}: Partial<Organizer> = {}): Organizer => ({
    id: 1,
    organizationName: 'organizationName',
    email: 'email',
    password: 'password',
    username: 'username',
    organizationAddress: 'organizationAddress',
    phoneNumber: 'phoneNumber',
    createdAt: new Date(),
});