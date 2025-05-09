import { Controller, Post, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto
  ): Promise<Omit<User, 'password'>> {
    const user = await this.accountService.createUser(createUserDto);
    const { password, ...result } = user.toObject();
    return result;
  }
}
