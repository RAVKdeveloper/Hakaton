import { Entity, Column, ManyToOne } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { User } from 'src/core/auth/entities/user.entity'

@Entity('site')
export class Site extends BasicEntity {
  @Column()
  name: string

  @Column({ unique: true })
  domen: string

  @Column({ default: '' })
  description: string

  @Column()
  html: string

  @ManyToOne(() => User, user => user.sites, { onDelete: 'CASCADE' })
  user: User
}
