import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UsersRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { LoginCredentialDto } from './dto/login-credential.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async logIn(
    loginCredentialDto: LoginCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = loginCredentialDto;
    const user = await this.usersRepository.findOne({ username });

    if (user && password === user.password) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      console.log(password + ' and ' + user.password);
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No User from goole';
    }

    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }
}
