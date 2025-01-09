import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
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

    @ManyToOne(() => ClientSchema)
    @JoinColumn()
    client: Relation<ClientSchema>;

    @Column({
        type: "enum",
        enum: TokenType,
        default: TokenType.EMAIL_VALIDATION
    })
    type: string;

    @UpdateDateColumn()
    createdAt?: Date;
}