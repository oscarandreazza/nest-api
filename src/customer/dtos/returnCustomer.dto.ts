import { CustomerEntity } from '../interfaces/customer.entity';

export class ReturnCustomerDto {
  id: number;
  name: string;
  document: string;
  address: string;
  user_id: number;

  constructor(customerEntity: CustomerEntity) {
    this.id = customerEntity.id;
    this.name = customerEntity.name;
    this.document = customerEntity.document;
    this.address = customerEntity.address;
    this.user_id = customerEntity.user.id;
  }
}
