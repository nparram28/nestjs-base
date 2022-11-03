import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Table } from '../../app/entity/table.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        return {
            name: 'name',
            type: 'mssql',
            host: 'host',
            port: 1433,
            username: 'user',
            password: 'password',
            database: 'database',
            entities: [Table],
            synchronize: false,
            options: { encrypt: false, trustServerCertificate: true, useUTC: false }
        } as TypeOrmModuleOptions;
    }
}
