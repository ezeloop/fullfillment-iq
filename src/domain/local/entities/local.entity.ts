import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Capacity } from '../../capacity/entities/capacity.entity';

@Entity()
export class Local {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @OneToMany(() => Order, (order) => order.local)
  orders: Order[];

  @OneToMany(() => Capacity, (capacity) => capacity.local)
  capacities: Capacity[];
}