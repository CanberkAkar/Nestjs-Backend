import { Body, Controller, Delete, Get,Param,Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get('/list')
    list(){
      return this.userService.list();
    }
    @Post('/insert')
    createUser(@Body() body:CreateUserDto){
      return this.userService.createUser(body);
    }
    @Put('/update/:id')
    updateUser(
      @Param('id') userId: number,
      @Body() body: UpdateUserDto
    ) {
      body.usr_id = Number(userId); // Doğru kullanım
      return this.userService.updateUser(body);
    }
    @Delete('/delete/:id')
    deleteUser(@Param('id') userId: number) {
      return this.userService.deleteUser(userId);
    }

}
