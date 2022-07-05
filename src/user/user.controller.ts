import { Controller, Get, Post, Body, Query, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Query() query): Promise<User> {
    console.log('get user');
    const { userId } = query;
    const data = await this.userService.getUser(userId);

    const blockUserId = [];
    const d = data[0].blockUserId;
    for (const i in d) {
      blockUserId.push(d[i].targetUserId);
    }
    
    return {
      ...data[0],
      blockUserId
    };
  }

  @Post()
  async addUser(@Body() req): Promise<User> {
    console.log('add user');
    return await this.userService.addUser(req);
  }

  @Patch()
  async updateUser(@Body() req): Promise<User> {
    console.log('update user');
    return await this.userService.updateUser(req);
  }
}
