
import { IsEmail,IsNotEmpty,IsNumber,IsString } from 'class-validator';
import { ApiProperty, } from '@nestjs/swagger';

export class CreateOrderDto{
    //EKLEME İÇİN KULLANACAĞIMIZ DTO'LAR
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example:'Sandwich'
     })
    order_desc:string;
    @IsNumber()
    @ApiProperty({
        example:1
     })
    order_usr_id:number;
    @IsNumber()
    @ApiProperty({
        example:1
     })
    order_comment_id:number;
    @IsNumber()
    @ApiProperty({
        example:1
     })
    order_category_id:number;
}