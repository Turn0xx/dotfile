import { Entity } from "typeorm";

@Entity('tokens')

export class TokenSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    email: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}