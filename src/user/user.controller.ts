import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Query() query): Promise<User> {
    console.log('get user');
    const { userId } = query;
    console.log(userId);
    return await this.userService.getUser(userId);
  }
  @Post()
  async addUser(@Body() req): Promise<User> {
    console.log('add user');
    return await this.userService.addUser(req);
  }
}
