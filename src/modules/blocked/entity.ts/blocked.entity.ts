import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blocked_ip_addresses')
export class BlockedEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  ip_address: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    unique: true,
  })
  blocked_date: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    unique: true,
  })
  unblocked_date: string;
}
