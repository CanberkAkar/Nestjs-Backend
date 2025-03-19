import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
function generateKey(): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    function getRandomSegment(length: number): string {
        return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    }

    return `${getRandomSegment(4)}-${getRandomSegment(4)}-${getRandomSegment(4)}-${getRandomSegment(4)}`;
}
    @Injectable()
    export class UserService 
    {
        
    private readonly logger = new Logger(UserService.name);  // Logger'ı sınıf içinde enjekte ettik

    constructor(@InjectRepository(Users) private readonly userRepository: Repository<Users>) {}

    async list() {
        await this.logger.log('Attempting to list all users');
        const users = await this.userRepository.find();
        return { status: "201", user: users };
    }

    async createUser(createUserDto: CreateUserDto) {
        this.logger.log('Attempting to create a new user');   
        
        try {
            const apiKey = generateKey();
            const users = this.userRepository.create(createUserDto);  
            users.usr_email = createUserDto.usr_email;
            users.usr_name = createUserDto.usr_name;
            users.usr_token = apiKey; 

            await this.userRepository.save(users);   
            
            this.logger.log(`User created successfully with ID: ${users.usr_id}`); 
            return { status: "201", user: users };
        } catch (error) {
            this.logger.error('Error occurred while creating user', error.stack);
            throw error;  // Hata fırlatma
        }
    }
    async updateUser(updateUserDto: UpdateUserDto) {
        await this.logger.log('Attempting to update user');
        const user= await this.userRepository.findOne({where :{ usr_id:Number(updateUserDto.usr_id)}});
        try {
            if(user)
            {
                user.usr_email = updateUserDto.usr_email;
                user.usr_name  = updateUserDto.usr_name;
                await this.userRepository.save(user);
                return { status: "200", user: user};
            }
        }
        catch (error) {
            this.logger.error('Error occurred while creating user', error.stack);
        }

    }
    async deleteUser(userId: number) {
        await this.logger.log('Attempting to update user');
        const user= await this.userRepository.findOne({where :{ usr_id:Number(userId)}});
        try {
            if(user)
            {
                await this.userRepository.softDelete(Number(userId));
                return { status: "200", user: user};
            }
        }
        catch (error) {
            this.logger.error('Error occurred while creating user', error.stack);
        }

    }
}
