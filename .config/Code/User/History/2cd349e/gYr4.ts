import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('clients')
export class ClientSchema {
    @PrimaryColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude() 
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phoneNumber: string;

    @Column()
    isVerified: boolean;

    @Column()
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}