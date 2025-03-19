
import { IsEmail,IsNotEmpty,IsNumber } from 'class-validator';
import { ApiProperty, } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto{
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example:'Id'
     })
     usr_id:number;
}