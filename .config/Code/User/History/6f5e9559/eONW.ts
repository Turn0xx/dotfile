import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class EventSchema {
    @PrimaryColumn({ unique: true })
    id: number;


    

}