import { Client } from '../domain/client';

export const clientBuilder = ({
  id = 1,
  email = 'email@gmail.com',
  password = 'password',
  phoneNumber = '+33636518875',
  createdAt = new Date('2023-01-01T10:30:00.000Z'),
}: Client= {}) => {};
