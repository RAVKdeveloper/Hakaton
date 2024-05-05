import { Entity, Column, OneToMany } from 'typeorm'

import { Site } from 'src/core/search/entities/site.entity'
import { BasicEntity } from 'src/basic/basic.entity'

@Entity('user')
export class User extends BasicEntity {
  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Column()
  surname: string

  @Column()
  password: string

  @OneToMany(() => Site, site => site.user)
  sites: Site[]
}
