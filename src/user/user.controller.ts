import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/users.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(@Body() req): Promise<User> {
    console.log('adduser');
    return await this.userService.addUser(req);
  }
}
