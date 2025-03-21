import { Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) {}
    async list() {
         const order = await this.orderRepository.find();
         return { status: "200", order: order };
    }
    async insert(createOrderDTO: CreateOrderDto) {
        try{
            const order = this.orderRepository.create(createOrderDTO);  
            order.order_desc = createOrderDTO.order_desc;
            order.order_usr_id = createOrderDTO.order_usr_id;
            order.order_comment_id = createOrderDTO.order_comment_id;
            order.order_category_id = createOrderDTO.order_category_id;
            await this.orderRepository.save(order);  
            return { status: "201", order: order };
        }
        catch(error){
            return { status: "500", error: error };
        }
    }
    async update(updateOrderDTO: UpdateOrderDto) 
    {
        const order = await this.orderRepository.findOne({where :{ order_id:Number(updateOrderDTO.order_id)}});
        try {
            if(order)
            {
                order.order_desc = updateOrderDTO.order_desc;
                order.order_usr_id = updateOrderDTO.order_usr_id;
                order.order_comment_id = updateOrderDTO.order_comment_id;
                order.order_category_id = updateOrderDTO.order_category_id;
                await this.orderRepository.save(order);
                return { status: "200", order: order};
            }
            else{
                return { status: "404", message: "Order not found"};
            }
        }
        catch(error){
            return { status: "500", error: error };
        }
    }
    async delete(orderId: number) {
        try{
            const order = await this.orderRepository.findOne({where :{ order_id:Number(orderId)}});
            if(order)
            {
                await this.orderRepository.delete(order);
                return { status: "200", message: "Order deleted"};
            }
            else{
                return { status: "404", message: "Order not found"};
            }
        }
        catch(error){
            return { status: "500", error: error };
        }
    }
}
