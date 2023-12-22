import { Body, Controller, Post, Get, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dtos/createCustomer.dto';
import { CustomerEntity } from './interfaces/customer.entity';
import { ReturnCustomerDto } from './dtos/returnCustomer.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('customer')
@Roles(UserType.User)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async customerCreate(@Body() customerCreate: CustomerDto): Promise<CustomerEntity> {
    return this.customerService.customerCreate(customerCreate);
  }

  @Get()
  async getAllCustomer(@Req() req): Promise<ReturnCustomerDto[]> {
    console.log(req.id);
    return (await this.customerService.getAllCustomer()).map((customerEntity) => {
      return new ReturnCustomerDto(customerEntity);
    });
  }
}
