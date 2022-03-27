import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(enteredUsername: string, enteredPassword: string) {
    const user = await this.usersService.findOne(enteredUsername);
    if (!user) throw new BadRequestException('user not found');
    if (user.password !== enteredPassword)
      throw new BadRequestException('password incorrect');
    const { role, _id } = user;
    return { role, _id };
  }

  async login(user: Partial<User>) {
    // Note: we choose a property name of sub to hold our userId value
    // to be consistent with JWT standards
    const { role, _id } = user;
    const payload = { sub: _id, role: role };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
