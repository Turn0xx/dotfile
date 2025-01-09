import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { BasicInformationSchema } from "./basic-information.schema";

@Entity()
export class EventSchema {
    @PrimaryColumn({ unique: true })
    id: number;

    @OneToOne(() => BasicInformationSchema, basicInformation => basicInformation.event)
    @Jo
    basicInformation: BasicInformationSchema;

    @Column()
    is_published: boolean;
}