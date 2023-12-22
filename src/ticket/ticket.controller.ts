import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketDto } from './dtos/createTicket.dto';
import { TicketEntity } from './interfaces/ticket.entity';
import { ReturnTicketDto } from './dtos/returnTicket.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@Controller('ticket')
@Roles(UserType.User)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async ticketCreate(@Req() req, @Body() ticketDto: TicketDto): Promise<TicketEntity> {
    return this.ticketService.ticketCreate(ticketDto, req.id);
  }

  @Get()
  async getAllTickets(@Req() Req): Promise<ReturnTicketDto[]> {
    return (await this.ticketService.getAllTickets(Req.id)).map((ticketEntity) => {
      return new ReturnTicketDto(ticketEntity);
    });
  }

  @Delete(':id')
  async deleteTicket(@Param('id') id: string): Promise<any> {
    try {
      const ticketid = parseInt(id, 10);
      await this.ticketService.deleteTicket(ticketid);
      return { message: 'Successfully deleted' };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
