import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Local {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column({ default: true })
  isActive: boolean;
}