import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './interfaces/customer.entity';
import { Repository } from 'typeorm';
import { CustomerDto } from './dtos/createCustomer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async customerCreate(customerCreate: CustomerDto): Promise<CustomerEntity> {
    return this.customerRepository.save(customerCreate);
  }

  async getAllCustomer(): Promise<CustomerEntity[]> {
    return this.customerRepository.find({
      relations: ['user'],
    });
  }
}
