import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() { password, username }: LoginDto) {
    const user = await this.authService.validateUser(username, password);
    return this.authService.getJWT(user);
  }
}
