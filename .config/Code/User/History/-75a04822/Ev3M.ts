import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tokens')

export class TokenSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @OneToOne(() => TokenSchema)
}