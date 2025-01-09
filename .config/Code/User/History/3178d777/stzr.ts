
// export const basicInformationBuilder = ({
//   id = 1,
//   basicInfo = {
//     eventName: 'Event Name',
//     eventTypes: ['Event Type 1', 'Event Type 2'],
//     eventCategory: 'Event Category',
//     tags: ['Tag 1', 'Tag 2'],
//   },

//   place = {
//     isOnline: true,
//     address: '8 Rue Jean Heanri Schnitzler, France',
//     address2: '',
//     city: 'Paris',
//     region: 'Ile de France',
//     zipCode: '75001',
//     country: 'France',
//   },

//   date = {
//     startDate: new Date(2021, 1, 1, 10, 30, 0),
//     endDate: new Date(2021, 1, 1, 18, 45, 0),
//     timeZone: 'Europe/Paris',
//   },
//   createdAt = new Date('2023-01-01T10:30:00.000Z'),
// }: Partial<EventBasicInformationsJson> = {}) => {
//   const props = {
//     id,
//     basicInfo,
//     place,
//     date,
//     createdAt,
//   };

//   return {
//     withId: (id: number) => basicInformationBuilder({ ...props, id }),
//     withEventName: (eventName: string) =>
//         basicInformationBuilder({ ...props, basicInfo: { ...basicInfo, eventName } }),
//     withEventTypes: (eventTypes: string[]) =>
//         basicInformationBuilder({ ...props, basicInfo: { ...basicInfo, eventTypes } }),
//     withEventCategory: (eventCategory: string) => 
//         basicInformationBuilder({ ...props, basicInfo: { ...basicInfo, eventCategory } }),
//     withTags: (tags: string[]) =>
//         basicInformationBuilder({ ...props, basicInfo: { ...basicInfo, tags } }),
//     withIsOnline: (isOnline: boolean) =>
//         basicInformationBuilder({ ...props, place: { ...place, isOnline } }),
//     withAddress: (address: string) =>
//         basicInformationBuilder({ ...props, place: { ...place, address } }),
//     withAddress2: (address2: string) => 
//         basicInformationBuilder({ ...props, place: { ...place, address2 } }),
//     withCity: (city: string) =>
//         basicInformationBuilder({ ...props, place: { ...place, city } }),
//     withRegion: (region: string) =>
//         basicInformationBuilder({ ...props, place: { ...place, region } }),
//     withZipCode: (zipCode: string) =>
//         basicInformationBuilder({ ...props, place: { ...place, zipCode } }),
//     withCountry: (country: string) =>
//         basicInformationBuilder({ ...props, place: { ...place, country } }),
//     withStartDate: (startDate: Date) =>
//         basicInformationBuilder({ ...props, date: { ...date, startDate } }),
//     withEndDate: (endDate: Date) =>
//         basicInformationBuilder({ ...props, date: { ...date, endDate } }),
//     withTimeZone: (timeZone: string) =>
//         basicInformationBuilder({ ...props, date: { ...date, timeZone } }),
//     build: () => props,
//   };
// };

// export type BasicInformationBuilder = ReturnType<typeof basicInformationBuilder>;