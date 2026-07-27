import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/SignUpDto.dto';
import { User } from 'src/user/entities/user.entity';
import { LocalAuthGuard } from './local-auth.guard';

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

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(
    @Req() req: { user: User },
    @Res({ passthrough: true }) response: any,
  ) {
    const tokens = await this.authService.signIn(req.user);
    response.cookie('token', tokens.refresh_token, { httpOnly: true });
    return { access_token: tokens.access_token };
  }
}
