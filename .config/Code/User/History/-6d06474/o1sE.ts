import { Entity } from "typeorm";

@Entity()
export class BasicInformationSchema {
    @PrimaryColumn({ unique: true })
    id: number;


    

}