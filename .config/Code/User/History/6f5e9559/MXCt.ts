import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class EventSchema {
    @PrimaryColumn({ unique: true })
    id: number;

    @OneToOne(() => BasicInformationSchema, basicInformation => basicInformation.event)
    basicInformation: BasicInformationSchema;

    @Column()
    is_published: boolean;
}