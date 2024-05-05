import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '../auth/entities/user.entity'
import { Site } from './entities/site.entity'

import { SearchService } from './search.service'
import { SearchController } from './search.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User, Site])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
