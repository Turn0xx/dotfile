import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class BasicInformationSchema {
    @PrimaryColumn({ unique: true })
    id: number;

    @Column()
    eventName: string;

    @Column()
    eventTypes: string[];

    @Column()
    eventCategory: string;

    @Column()
    tags: string[];

    @Column()
    isOnline: boolean;

    @Column()
    address?: string;

    @Column()
    address2?: string;

    @Column()
    city?: string;

    @Column()
    region?: string;

    @Column()
    zipCode?: string;

    @Column()
    country?: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    timeZone: string;

    @OneToOne(() => EventSchema, event => event.basicInformations)

    @Column()
    createdAt: Date;
}