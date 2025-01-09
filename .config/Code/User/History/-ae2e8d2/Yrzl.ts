import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany, Relation } from 'typeorm';
import { EventSchema } from './event.schema';

@Entity()
export class OrganizerSchema {
  @PrimaryColumn({unique: true})
  id: number;

  @Column()
  organizationName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  organizationAddress: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  createdAt: Date;

  @OneToMany('EventSchema', 'organizer')
  events: Relation<EventSchema[]>;
}
