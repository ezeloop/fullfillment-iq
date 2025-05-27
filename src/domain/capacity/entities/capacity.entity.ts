import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Local } from '../../local/entities/local.entity';

@Entity()
export class Capacity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column('int')
  capacity: number;

  @Column({ default: false })
  isWeekend: boolean;

  @Column({ default: false })
  isHoliday: boolean;

  @Column({ default: false })
  promoActive: boolean;

  @ManyToOne(() => Local, (local) => local.capacities, { onDelete: 'CASCADE' })
  local: Local;
}
