import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OrganizerSchema {
  @PrimaryGeneratedColumn()
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

  @Column({ unique: false })
  phoneNumber: string;

  @Column()
  createdAt: Date;
}
