import { Body, Controller, Get,Post,Param,Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}
    @Get('/list')
    list(){
        return this.orderService.list();
    }
    @Post('/insert')
    insert(@Body() body:CreateOrderDto){
        return this.orderService.insert(body);
    }
    @Put('/update:id')
    update(
        @Param('id') orderId: number,
        @Body() body: UpdateOrderDto
      ) {
        body.order_id = Number(orderId); // Doğru kullanım
        return this.orderService.update(body);
      }
    @Delete('/delete/:id')
     delete(@Param('id') orderId: number) 
     {
        return this.orderService.delete(orderId);
    }
}
