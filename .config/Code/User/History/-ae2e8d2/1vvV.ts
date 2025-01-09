
@Entity()
export class OrganizerSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organizationName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  organizationAddress: string;

  @Column()
  phoneNumber: string;

  @Column()
  createdAt: Date;
}