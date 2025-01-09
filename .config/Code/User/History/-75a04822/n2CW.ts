import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { ClientSchema } from "../../../infrastructure/client.schema";

@Entity('tokens')
export class TokenSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @OneToOne(() => ClientSchema)
    @JoinColumn()
    client: Relation<ClientSchema>;

    @UpdateDateColumn()
    createdAt?: Date;
}