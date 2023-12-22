import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from './interfaces/ticket.entity';
import { Repository } from 'typeorm';
import { TicketDto } from './dtos/createTicket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  async ticketCreate(ticketCreate: TicketDto, id: number): Promise<TicketEntity> {
    console.log({ ...ticketCreate, user_id: id });
    return this.ticketRepository.save({ ...ticketCreate, user_id: id });
  }

  async getAllTickets(id: number): Promise<TicketEntity[]> {
    return await this.ticketRepository.find({
      where: { user_id: id },
      relations: ['user', 'customer'],
    });
  }

  async deleteTicket(id: number): Promise<any> {
    const ticket = await this.ticketRepository.findOne({ where: { id: id } });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    await this.ticketRepository.delete(ticket);
  }
}
