import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';

import Image from './Image';
import Users from './Users';


@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;
  

  @Column()
  name: string;
  
  @Column()
  latitude: number;

  
  @Column()
  longitude: number;
  
  @Column()
  about: string;
  
  @Column()
  instructions: string;
  
  @Column()
  open_hours: string;
  
  @Column()
  open_on_weekends: boolean;

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({name: 'orphanages_id'})
  images: Image[];

  
  @OneToOne(() => Users)
  @JoinColumn({name: 'users_id'})
  users_id: Users;

  

}