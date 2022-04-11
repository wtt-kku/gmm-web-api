import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction_log')
export class LogEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  msisdn: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  device: string;

  @Column({ nullable: true })
  browser: string;

  @Column({ nullable: true })
  service_name: string;

  @Column({ nullable: true })
  short_code: string;

  @Column({ nullable: true })
  cid: string;

  @Column({ nullable: true })
  media_code: string;

  @Column({ nullable: true, type: 'timestamp' })
  appear_time: string;

  @Column({ nullable: true, type: 'timestamp' })
  hit_time: string;

  @Column({ type: 'integer', nullable: true })
  time_on_page: number;

  @Column({ type: 'boolean', nullable: true })
  is_bot: boolean;

  @Column({ type: 'boolean', nullable: true })
  is_complete: boolean;

  @Column({ type: 'boolean', nullable: true })
  blocked: boolean;

  @Column({ type: 'timestamp' })
  transaction_date: string;
}
