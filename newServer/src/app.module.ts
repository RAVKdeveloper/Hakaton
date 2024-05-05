import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

import { AuthModule } from './core/auth/auth.module'
import { SearchModule } from './core/search/search.module'
import { JwtGenService } from './core/jwt/token.service'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'kirill2008',
      database: 'Search',
      synchronize: true,
      autoLoadEntities: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '30d' },
    }),
    AuthModule,
    SearchModule,
  ],
  controllers: [],
  providers: [JwtGenService],
})
export class AppModule {}
