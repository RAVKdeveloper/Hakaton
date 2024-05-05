import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike } from 'typeorm'

import { Site } from './entities/site.entity'

import { CreateSiteDto } from './dto/create-search.dto'
import { QuerySidesDto } from './dto/query-sides.dto'

@Injectable()
export class SearchService {
  constructor(@InjectRepository(Site) private siteRepo: Repository<Site>) {}

  public async create(dto: CreateSiteDto, userId: number) {
    const isNotEmpty = await this.siteRepo.findOne({ where: { domen: dto.domen } })

    if (isNotEmpty) throw new ForbiddenException('Такой сайт существует')

    const side = await this.siteRepo.save({ ...dto, user: { id: userId } })

    return side
  }

  public async findAll(query: QuerySidesDto) {
    const sides = await this.siteRepo.find({
      where: [
        { name: ILike(`%${query.searchValue}%`) },
        { domen: ILike(`%${query.searchValue}%`) },
      ],
      relations: {
        user: true,
      },
      take: Number(query.take ?? 10),
      skip: (Number(query.page) - 1) * Number(query.take ?? 10),
    })

    if (sides.length === 0) throw new NotFoundException('Данные не найдены')

    return sides
  }

  public async findOne(id: number) {
    const side = await this.siteRepo.findOne({ where: { id }, relations: { user: true } })

    if (!side) throw new NotFoundException('Сайт не найден')

    return side
  }

  public remove(id: number, userId: number) {
    return this.siteRepo.delete({ id, user: { id: userId } })
  }
}
