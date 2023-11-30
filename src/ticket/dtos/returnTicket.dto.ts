import { TicketEntity } from '../interfaces/ticket.entity';

export class ReturnTicketDto {
  id: number;
  subject: string;
  details: string;
  status: number;
  user_id: number;
  customer_id: number;

  constructor(ticketEntity: TicketEntity) {
    this.id = ticketEntity.id;
    this.subject = ticketEntity.subject;
    this.details = ticketEntity.details;
    this.status = ticketEntity.status;
    this.user_id = ticketEntity.user.id;
    this.customer_id = ticketEntity.customer.id;
  }
}
