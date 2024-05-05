import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import type { Response } from 'express'

import { JwtGenService } from '../jwt/token.service'

import { User } from './entities/user.entity'

import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private tokenService: JwtGenService,
  ) {}

  public async registr(dto: CreateAuthDto, res: Response) {
    const isEmptyUser = await this.userRepo.findOne({ where: { email: dto.email } })

    if (isEmptyUser) throw new ForbiddenException('Такой пользователь уже существует')

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(dto.password, salt)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userRepo.save({
      ...dto,
      password: hashPassword,
    })

    const acces_token = await this.tokenService.generateTokens({
      userId: user.id,
      userName: user.name,
    })

    res.cookie('acces_token_auth', acces_token, { httpOnly: true })

    res.status(201).send(user)
  }

  public async login(dto: LoginAuthDto, res: Response) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } })

    if (!user) throw new NotFoundException('Неверный логин или пароль')

    const isValidPass = await bcrypt.compare(dto.password, user.password)

    if (!isValidPass) throw new ForbiddenException('Неверный логин или пароль')

    const acces_token = await this.tokenService.generateTokens({
      userId: user.id,
      userName: user.name,
    })

    res.cookie('acces_token_auth', acces_token, { httpOnly: true })

    res.status(201).send(user)
  }

  public findAll() {
    return this.userRepo.find()
  }

  public async me(id: number) {
    const { password, ...user } = await this.userRepo.findOne({
      where: { id },
    })

    if (!user) throw new NotFoundException('Пользователь с таким id небыл найден')

    return user
  }
}
