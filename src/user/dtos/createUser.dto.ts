import { IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  image_url: string;

  @IsString()
  password: string;
}
