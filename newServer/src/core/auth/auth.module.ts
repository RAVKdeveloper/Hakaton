import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JwtGenService } from '../jwt/token.service'
import { User } from './entities/user.entity'
import { Site } from '../search/entities/site.entity'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User, Site])],
  controllers: [AuthController],
  providers: [AuthService, JwtGenService],
})
export class AuthModule {}
