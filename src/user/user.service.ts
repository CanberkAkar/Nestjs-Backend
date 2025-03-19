import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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

    activeUsers() {
        return 'Active users';
    }

    async createUser(createUserDto: CreateUserDto) {
        this.logger.log('Attempting to create a new user');   
        
        try {
            const apiKey = generateKey();
            const users = this.userRepository.create(createUserDto);  
            users.usr_id = uuidv4();
            users.usr_email = createUserDto.usr_email;
            users.usr_name = createUserDto.usr_name;
            users.usr_token = apiKey;
            users.createdAt = new Date();
            users.updatedAt = new Date();

            await this.userRepository.save(users);   
            
            this.logger.log(`User created successfully with ID: ${users.usr_id}`); 
            return { status: "201", user: users };
        } catch (error) {
            this.logger.error('Error occurred while creating user', error.stack);
            throw error;  // Hata fırlatma
        }
    }
}
