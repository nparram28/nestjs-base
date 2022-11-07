import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Table } from '../../app/entity/table.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        return {
            name: process.env.DB_NAME,
            type: 'mssql',
            host: process.env.DB_HOST,
            port: 1433,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [Table],
            synchronize: false,
            options: { encrypt: false, trustServerCertificate: true, useUTC: false }
        } as TypeOrmModuleOptions;
    }
}
