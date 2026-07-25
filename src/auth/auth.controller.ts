import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/SignUpDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    if (!signUpDto) {
      throw new BadRequestException('No User Data Given');
    }
    if (signUpDto.password !== signUpDto.repeatPassword) {
      throw new BadRequestException(
        'Repeat Password is not the same with the Password',
      );
    }
    return this.authService.signUp(signUpDto);
  }
}
