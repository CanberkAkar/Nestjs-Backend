import { Column, CreateDateColumn, DeleteDateColumn, Entity ,PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Users{
    // BURASI DATABASE ALANLARIMIZDIR
    @Column()
    @PrimaryGeneratedColumn()
    usr_id:number;
    @Column()
    usr_email:string;
    @Column()
    usr_name:string;
    @Column()
    usr_token:string;
    @CreateDateColumn()
    createdAt!:Date;
    @UpdateDateColumn()
    updatedAt!:Date;
    @DeleteDateColumn()
    deletedAt!:Date;
}