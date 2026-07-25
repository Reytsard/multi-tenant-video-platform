import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/SignUpDto.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Email is not registered');
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new BadRequestException();
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userService.findByEmail(signUpDto.email);
    if (user) {
      throw new BadRequestException('Email already exists.');
    }
    if (await this.userService.existsByUsername(signUpDto.username)) {
      throw new BadRequestException('Username already exists');
    }
    const saltRounds = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(signUpDto.password, saltRounds);
    const userData: CreateUserDto = {
      email: signUpDto.email,
      username: signUpDto.username,
      password: hashedPassword,
    };
    console.log(userData);
    const savedData = await this.userService.create(userData);
    return {
      email: savedData.email,
      id: savedData.id,
    };
  }
}
