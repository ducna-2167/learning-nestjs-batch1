import { IsString } from 'class-validator';

export class LoginCredentialDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
