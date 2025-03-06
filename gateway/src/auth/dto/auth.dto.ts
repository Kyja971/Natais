import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { RoleTypeEnum } from "../models/role.type.enum";

export class AuthDto {
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;
  
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
  
    @IsString()
    readonly password: string;
  
    @IsEnum(RoleTypeEnum)
    @IsNotEmpty()
    readonly role: RoleTypeEnum
}
