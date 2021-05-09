import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Family {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  qty_children: number;

  @Column()
  district: string;

  @Column()
  zip_code: string;

  @Column()
  number_house: string;

  @Column()
  complement: string;

  @Column()
  city: string;

  @Column()
  qty_people_live: number;

  @Column()
  whatsapp: string;

  @Column()
  helped: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
