import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    activeUsers(){
        return 'Active users';
    }
    createUser(createUserDto:CreateUserDto){
        return { status: "201", "User":createUserDto };
    }  
}
