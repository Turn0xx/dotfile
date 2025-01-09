import { DataSource } from "typeorm";

export class GlobalDataSource {


    constructor(
        private readonly client: DataSource
    ) { }


}