import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUser: UserDto): Promise<any> {
    const user = await this.usersService.findOne(loginUser.username);

    if (user && (await bcrypt.compare(loginUser.password, user.password))) {
      delete user.password;
      return user;
    }

    throw new UnauthorizedException();
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      isAdmin: user.isAdmin,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
