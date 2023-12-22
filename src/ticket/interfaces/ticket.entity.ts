import { CustomerEntity } from 'src/customer/interfaces/customer.entity';
import { UserEntity } from 'src/user/interfaces/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'ticket' })
export class TicketEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'subject', nullable: false })
  subject: string;

  @Column({ name: 'details' })
  details: string;

  @Column({ name: 'status', nullable: false })
  status: number;

  @Column({ name: 'user_id', nullable: false })
  user_id: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CustomerEntity, (customer) => customer.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
