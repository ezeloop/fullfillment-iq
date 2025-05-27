import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Local } from '../../local/entities/local.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Local, (local) => local.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'local_id' })
  local: Local;
}