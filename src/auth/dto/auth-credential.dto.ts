import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

// Đăng ký với Google hoặc form
// Tên: tối đa 100 ký tự
// Username: unique, tối đa 50 ký tự, chỉ chứa chữ cái latin, số và dấu gạch ngang - (không được ở vị trí bắt đầu hoặc kết thúc và không được liền nhau)
// Email không require, nếu có thì validate format, unique, cần verify
// Mật khẩu tối thiểu 8 ký tự
// Avatar: định dạnh jpg, png, kích thước tối đa 1MB

export class AuthCredentialsDto {
  @IsString()
  @Matches(/(?=^.{3,50}$)(^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?!-))+[a-zA-Z0-9])$/, {
    message:
      'tối đa 50 ký tự, chỉ chứa chữ cái latin, số và dấu gạch ngang - (không được ở vị trí bắt đầu hoặc kết thúc và không được liền nhau)',
  })
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @MaxLength(100)
  @IsString()
  name: string;

  @IsString()
  avatar: string;
}
