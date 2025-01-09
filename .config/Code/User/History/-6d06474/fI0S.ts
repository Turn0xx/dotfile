import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class BasicInformationSchema {
    @PrimaryColumn({ unique: true })
    id: number;

    


    @Column()
    createdAt: Date;
}