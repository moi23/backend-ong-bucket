import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Family } from './Family';
import { User } from './User';

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Family)
  @JoinTable({ name: 'families_actions' })
  Families: Family[];

  // @ManyToMany(() => User)
  // @JoinTable({ name: 'users_actions' })
  // users: User[];
}
