import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  targetAmount?: number;

  @Column()
  recipient?: string;

  @Column()
  fromCurrency?: string;

  @Column()
  toCurrency?: string;

  @Column()
  description?: string;

  @Column()
  trxDate?: Date;

  @Column()
  timestamp?: Date;
}
