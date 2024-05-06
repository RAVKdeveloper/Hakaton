import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm'

export class TypeOrmConfigClass {
  static getOrmConfig(config: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: config.get('db.host'),
      port: config.get('db.port'),
      username: config.get('db.login'),
      password: config.get('db.password'),
      database: config.get('db.name'),
      // entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
      autoLoadEntities: true,
    }
  }
}

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configservice: ConfigService): Promise<TypeOrmModuleOptions> => {
    return TypeOrmConfigClass.getOrmConfig(configservice)
  },
  inject: [ConfigService],
}
