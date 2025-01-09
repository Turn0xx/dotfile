import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class EventSchema {
    @PrimaryColumn({ unique: true })
    id: number;

    @Column()
    is_published: boolean;
}