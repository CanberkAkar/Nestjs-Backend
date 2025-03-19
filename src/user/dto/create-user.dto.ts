
import { IsEmail,IsNotEmpty,IsString } from 'class-validator';
import { ApiProperty, } from '@nestjs/swagger';

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example:'Canberk Akar'
     })
    usr_name:string;
    @IsEmail()
    @ApiProperty({
        example:'info@deneme.com'
     })
    usr_email:string;
}