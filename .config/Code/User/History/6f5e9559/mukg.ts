import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, Relation } from "typeorm";
import { BasicInformationSchema } from "./basic-information.schema";
import { OrganizerSchema } from "./organizer.schema";

@Entity()
export class EventSchema {
    @PrimaryColumn({ unique: true })
    id: number;
    
    @Column()
    is_published: boolean;
    
    @ManyToOne('OrganizerSchema', 'events')
    organizer: OrganizerSchema;

    @OneToOne('BasicInformationSchema' , 'event')
    basicInformation: Relation<BasicInformationSchema>;
}