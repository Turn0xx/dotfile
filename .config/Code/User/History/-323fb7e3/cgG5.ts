
export const basicInformationBuilder = ({
  id = 1,
  organizerId = 1,
  basicInfo = {
    eventName: 'Event Name',
    eventTypes: ['Event Type 1', 'Event Type 2'],
    eventCategory: 'Event Category',
    tags: ['Tag 1', 'Tag 2'],
  },

  place = {
    isOnline: true,
    address: '8 Rue Jean Heanri Schnitzler, France',
    address2: '',
    city: 'Paris',
    region: 'Ile de France',
    zipCode: '75001',
    country: 'France',
  },

  date = {
    startDate: new Date(2021, 1, 1, 10, 30, 0),
    endDate: new Date(2021, 1, 1, 18, 45, 0),
    timeZone: 'Europe/Paris',
  },
  createdAt = new Date('2023-01-01T10:30:00.000Z'),
}: Partial<BasicInformations> = {}) => {
  const props = {
    id,
    organizerId,
    basicInfo,
    place,
    date,
    createdAt,
  };

  return {
    withId: (id: number) => basicInformationBuilder({ ...props, id }),
    withOrganizerId: (organizerId: number) =>
      basicInformationBuilder({ ...props, organizerId }),
    withBasicInfo: (basicInfo: EventBasicInformation) =>
      basicInformationBuilder({ ...props, basicInfo }),
    withPlace: (place: EventPlace) =>
      basicInformationBuilder({ ...props, place }),
    withDate: (date: EventDate) => basicInformationBuilder({ ...props, date }),
    withCreatedAt: (createdAt: Date) =>
      basicInformationBuilder({ ...props, createdAt }),
    build: () => props,
  };
};

export type BasicInformationBuilder = ReturnType<typeof basicInformationBuilder>;