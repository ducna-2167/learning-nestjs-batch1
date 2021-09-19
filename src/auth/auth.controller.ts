import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotAcceptableException,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { LoginCredentialDto } from './dto/login-credential.dto';
import { UsersRepository } from './user.repository';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersRepository: UsersRepository,
  ) {}
  @Post('/signup')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    if (
      !authCredentialsDto.avatar ||
      !authCredentialsDto.email ||
      !authCredentialsDto.name ||
      !authCredentialsDto.password ||
      !authCredentialsDto.username
    )
      throw new NotAcceptableException(' you have to insert all filed ');

    if (
      (await this.usersRepository.findOne({
        username: authCredentialsDto.username,
      })) ||
      (await this.usersRepository.findOne({
        email: authCredentialsDto.email,
      }))
    ) {
      throw new ConflictException();
    }

    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() loginCredentialDto: LoginCredentialDto,
  ): Promise<{ accessToken: string }> | { message: string } {
    return this.authService.logIn(loginCredentialDto);
  }

  @Get('/signin')
  @Render('signin')
  showSignin() {
    return { message: 'Hello world!' };
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('goole'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
