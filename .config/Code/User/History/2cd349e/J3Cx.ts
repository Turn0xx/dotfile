import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export type ClientDataModel = Omit<ClientSchema, | 'updatedAt'>;

export type IndividualDataModel = Omit<ClientDataModel, 'companyName'>;
export type CompanyDataModel = Omit<ClientDataModel, 'firstName' | 'lastName'>;

export enum AccountTypeEnum {
    INDIVIDUAL = 'individual',
    COMPANY = 'company'
}


@Entity('clients')
export class ClientSchema {
    @PrimaryColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude() 
    password: string;

    @Column({ nullable: true})
    firstName?: string;

    @Column({ nullable: true})
    lastName?: string;

    @Column({ nullable: true})
    companyName?: string;

    @Column()
    phoneNumber: string;

    @Column({ default: false })
    isVerified?: boolean;
    
    @Column({ type: 'enum', enum: ['individual', 'company']})
    accountType: AccountTypeEnum;

    @Column()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}