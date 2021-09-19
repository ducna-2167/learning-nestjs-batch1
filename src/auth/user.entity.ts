import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Đăng ký với Google hoặc form
// Tên: tối đa 100 ký tự
// Username: unique, tối đa 50 ký tự, chỉ chứa chữ cái latin, số và dấu gạch ngang - (không được ở vị trí bắt đầu hoặc kết thúc và không được liền nhau)
// Email không require, nếu có thì validate format, unique, cần verify
// Mật khẩu tối thiểu 8 ký tự
// Avatar: định dạnh jpg, png, kích thước tối đa 1MB

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar: string;
}
