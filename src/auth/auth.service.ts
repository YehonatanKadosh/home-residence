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

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (!user) throw new BadRequestException('user not found');
    if (user.password !== password)
      throw new BadRequestException('password incorrect');
    const { role, _id } = user;
    return { role, _id };
  }

  async getJWT({ role, _id }: Partial<User>) {
    // Note: we choose a property name of sub to hold our userId value
    // to be consistent with JWT standards
    const payload = { sub: _id, role };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
