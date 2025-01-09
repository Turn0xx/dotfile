import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClientSchema } from "../../infrastructure/client.schema";

@Entity('tokens')

export class TokenSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @OneToOne(() => ClientSchema)
    client: ClientSchema;
}