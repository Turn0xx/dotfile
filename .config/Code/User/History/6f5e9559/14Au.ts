import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { BasicInformationSchema } from "./basic-information.schema";

@Entity()
export class EventSchema {
    @PrimaryColumn({ unique: true })
    id: number;

    @OneToOne(() => BasicInformationSchema, basicInformation => basicInformation.event)
    @JoinColumn()
    basicInformation: BasicInformationSchema;

    @ManyToOne(() => OrganizerSchema, organizer => organizer.events)
    organizer: OrganizerSchema;

    @Column()
    is_published: boolean;
}