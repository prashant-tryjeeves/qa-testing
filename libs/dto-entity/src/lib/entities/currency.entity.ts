import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryColumn()
  isoCode?: string;

  @Column()
  name?: string;
}
