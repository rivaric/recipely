import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  name: string;
  
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
