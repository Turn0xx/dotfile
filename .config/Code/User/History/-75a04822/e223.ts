import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tokens')

export class TokenSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @OneTo
}