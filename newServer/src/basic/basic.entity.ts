import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'

@Entity('basic')
export class BasicEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date
}
