import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketDto } from './dtos/createTicket.dto';
import { TicketEntity } from './interfaces/ticket.entity';
import { ReturnTicketDto } from './dtos/returnTicket.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async ticketCreate(@Body() ticketDto: TicketDto): Promise<TicketEntity> {
    return this.ticketService.ticketCreate(ticketDto);
  }

  @Get()
  async getAllTickets(): Promise<ReturnTicketDto[]> {
    return (await this.ticketService.getAllTickets()).map((ticketEntity) => {
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
