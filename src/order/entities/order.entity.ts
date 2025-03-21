import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Order {
    //DB MODELINI OLUŞTURUYORUZ
    
    @PrimaryGeneratedColumn()
    order_id: number;
    @Column()
    order_desc: string;
    @Column()
    order_usr_id:number;
    @Column()
    order_comment_id:number;
    @Column()
    order_category_id:number;
}