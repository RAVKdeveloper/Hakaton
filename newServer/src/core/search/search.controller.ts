import { Controller, Get, Post, Body, Query, Param, Delete, UseGuards, Req } from '@nestjs/common'
import type { Request } from 'express'

import { AuthGuard } from 'src/guards/auth.guard'

import { SearchService } from './search.service'
import { CreateSiteDto } from './dto/create-search.dto'
import { QuerySidesDto } from './dto/query-sides.dto'

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(AuthGuard)
  @Post('side')
  create(@Body() dto: CreateSiteDto, @Req() req: Request) {
    return this.searchService.create(dto, req['user'].userId)
  }

  @Get('side')
  findAll(@Query() query: QuerySidesDto) {
    return this.searchService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchService.findOne(+id)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.searchService.remove(+id, req['user'].userId)
  }
}
