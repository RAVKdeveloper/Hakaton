import { Controller, Get, Post, Body, Res, Req, UseGuards } from '@nestjs/common'
import type { Response, Request } from 'express'

import { AuthGuard } from 'src/guards/auth.guard'

import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  create(@Body() dto: CreateAuthDto, @Res() res: Response) {
    return this.authService.registr(dto, res)
  }

  @Post('login')
  login(@Body() dto: LoginAuthDto, @Res() res: Response) {
    return this.authService.login(dto, res)
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    return this.authService.me(req['user'].userId)
  }

  @Get()
  findAll() {
    return this.authService.findAll()
  }
}
