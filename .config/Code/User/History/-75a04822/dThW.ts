import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { ClientSchema } from "../../infrastructure/client.schema";

@Entity('tokens')

export class TokenSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @OneToOne(() => ClientSchema)
    @JoinColumn()
    client: Relation<ClientSchema>;

    @CreateDateColumn()
    createdAt: Date;
}