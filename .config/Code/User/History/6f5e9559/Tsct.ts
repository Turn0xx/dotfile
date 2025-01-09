import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { BasicInformationSchema } from "./basic-information.schema";
import { OrganizerSchema } from "./organizer.schema";

@Entity()
export class EventSchema {
    @PrimaryColumn({ unique: true })
    id: number;


    @ManyToOne(() => OrganizerSchema, organizer => organizer.events)
    organizer: OrganizerSchema;

    @Column()
    is_published: boolean;
}