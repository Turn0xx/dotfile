import { OrganizerJSON } from '../domain/organizer';

export const organizerBuilder = ({
  id = 1,
  organizationName = 'Alice Organization',
  email = 'alice@gmail.com',
  password = 'password',
  username = 'Alic0x',
  organizationAddress = '8 Rue Jean Heanri Schnitzler, France',
  phoneNumber = '+33636518875',
  createdAt = new Date('2023-01-01T10:30:00.000Z'),
  events = [],
}: Partial<OrganizerJSON> = {}) => {
  const props = {
    id,
    organizationName,
    email,
    password,
    username,
    organizationAddress,
    phoneNumber,
    createdAt,
    events,
  };

  return {
    withId: (id: number) => organizerBuilder({ ...props, id }),
    withOrganizationName: (organizationName: string) =>
      organizerBuilder({ ...props, organizationName }),
    withEmail: (email: string) => organizerBuilder({ ...props, email }),
    withPassword: (password: string) => organizerBuilder({ ...props, password }),
    withUsername: (username: string) => organizerBuilder({ ...props, username }),
    withOrganizationAddress: (organizationAddress: string) =>
      organizerBuilder({ ...props, organizationAddress }),
    withPhoneNumber: (phoneNumber: string) =>
        organizerBuilder({ ...props, phoneNumber }),
    withCreatedAt: (createdAt: Date) => organizerBuilder({ ...props, createdAt }),
    build: () => props,
  };
};
