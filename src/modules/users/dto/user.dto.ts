import { IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserDto {

    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly nickName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    readonly password: string;

    readonly avatar?: any;

    readonly rating?: number;

    readonly favorites?: boolean
}