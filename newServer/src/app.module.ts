import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

import configuration from './config/default.config'
import { typeOrmConfig } from './config/typeorm.config'

import { AuthModule } from './core/auth/auth.module'
import { SearchModule } from './core/search/search.module'
import { JwtGenService } from './core/jwt/token.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    AuthModule,
    SearchModule,
  ],
  controllers: [],
  providers: [JwtGenService],
})
export class AppModule {}
