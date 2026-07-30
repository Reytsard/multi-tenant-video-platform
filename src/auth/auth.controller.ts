import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/SignUpDto.dto';
import { User } from 'src/user/entities/user.entity';
import { LocalAuthGuard } from './local-auth.guard';
import { RefreshAuthGuard } from './refresh-auth.guard';
import { SignInDto } from './dto/SignInDto.dto';

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
    @Body() _signInDto: SignInDto,
    @Req() req: { user: User },
    @Res({ passthrough: true }) response: any,
  ) {
    console.log('signin', req.user);
    const accessToken = await this.authService.getAccessToken(req.user);
    const refreshToken = await this.authService.getRefreshToken(req.user);
    response.cookie('token', refreshToken, { httpOnly: true });
    return { access_token: accessToken };
  }

  @UseGuards(RefreshAuthGuard)
  @Get('/refresh')
  async refreshToken(@Req() req) {
    return {
      access_token: await this.authService.getRefreshedAccessToken(req.user),
    };
  }
}
