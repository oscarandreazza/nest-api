import { CustomerEntity } from 'src/customer/interfaces/customer.entity';
import { UserEntity } from 'src/user/interfaces/user.entity';
import { IsString, IsObject, IsNumber } from 'class-validator';

export class TicketDto {
  @IsString()
  subject: string;

  @IsString()
  details: string;

  @IsNumber()
  status: number;

  @IsObject()
  customer: CustomerEntity;
}
