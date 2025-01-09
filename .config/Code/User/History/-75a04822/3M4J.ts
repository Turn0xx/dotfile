import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { ClientSchema } from "../../infrastructure/client.schema";


export enum TokenType {
    EMAIL_VALIDATION = 'EMAIL_VALIDATION',
    PASSWORD_RESET = 'PASSWORD_RESET',
}

@Entity('tokens')
export class TokenSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @OneToOne(() => ClientSchema)
    @JoinColumn()
    client: Relation<ClientSchema>;

    @Column()
    type: string;

    @UpdateDateColumn()
    createdAt?: Date;
}