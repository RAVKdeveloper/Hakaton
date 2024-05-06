import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  app.enableCors({ credentials: true, origin: 'http://localhost:3000' })
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())

  await app.listen(configService.get('port'))
}
bootstrap()
