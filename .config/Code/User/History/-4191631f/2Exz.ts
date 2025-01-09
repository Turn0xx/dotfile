import { DataSource } from 'typeorm';

export class GlobalDataSource {
  constructor(private readonly dataSource: DataSource) {}

  getDataSource(): DataSource {
    return this.dataSource;
  }
}
