import { UserEntity } from 'src/user/interfaces/user.entity';
import { IsString, IsObject } from 'class-validator';

export class CustomerDto {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsString()
  address: string;
}
