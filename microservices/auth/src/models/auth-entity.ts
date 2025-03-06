import { IsEmail, Contains, IsEnum } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { RoleTypeEnum } from "./role-type-enum";

@Entity({
    name: "auth",
  })
  export class AuthEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true, length: 70 })
    @IsEmail()
    email: string;
  
    @Column()
    password: string;
  
    @Column()
    @IsEnum(RoleTypeEnum)
    role: RoleTypeEnum;
   
  }