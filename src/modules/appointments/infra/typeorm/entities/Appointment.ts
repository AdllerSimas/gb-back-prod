import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

//reference the name of table
@Entity('appointments')
class Appointment{

  //primary key, generate id automatically
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // column, type varchar - string
  @Column()
  provider_id: string;

  // many appointments to one provider
  // provider_id reference the user to this appointment
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;


  @Column()
  user_id: string;

  //many appointments to one user
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // timestamp.. specific from postgres
  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Appointment;
