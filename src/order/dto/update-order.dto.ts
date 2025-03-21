
import { IsEmail,IsNotEmpty,IsNumber } from 'class-validator';
import { ApiProperty, } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
 

export class UpdateOrderDto extends CreateOrderDto{
    //EKLEME İÇİN KULLANACAĞIMIZ DTO'LAR BURADA EXTENDS ETME İŞLEMİ YAPTIK. BU SAYEDE CREATEUSERDTO'DAKİ ALANLARI KULLANABİLİRİZ

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example:'Id'
     })
     order_id:number;
}