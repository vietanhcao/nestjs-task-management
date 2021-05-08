import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";



@Entity()
@Unique(['username'])//add contrain
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}