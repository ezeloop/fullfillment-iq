import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Local } from './local.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Local)
  @JoinColumn({ name: 'local_id' })
  local: Local;

  @Column()
  createdAt: Date;

  @Column()
  status: string;
}