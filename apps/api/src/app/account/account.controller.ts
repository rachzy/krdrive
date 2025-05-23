import { Controller, Param, Get, NotFoundException } from '@nestjs/common';
import { AccountService } from './account.service';
import { User } from './schemas/user.schema';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // @Post('register')
  // async register(
  //   @Body() createUserDto: CreateUserDto
  // ): Promise<Omit<User, 'password'>> {
  //   const user = await this.accountService.createUser(createUserDto);
  //   const { password, ...result } = user.toObject();
  //   return result;
  // }

  @Get('get-user/:id')
  async getUser(@Param('id') id: string): Promise<Omit<User, 'password'>> {
    const user = await this.accountService.findByID(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...result } = user.toObject();
    return result;
  }
}
