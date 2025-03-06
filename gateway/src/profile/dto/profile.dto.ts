import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class ProfileDto {
    @IsString()
    @MaxLength(25)
    @IsNotEmpty()
    readonly firstname: string;
  
    @IsString()
    @MaxLength(25)
    @IsNotEmpty()
    readonly lastname: string;
  
    @IsString()
    @IsOptional()
    @MaxLength(15)
    readonly gender: string;
  
    @IsString()
    @IsNotEmpty()
    readonly email: string;
  
    @IsString()
    @IsOptional()
    readonly phonenumber: string;
}
