import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('config')
export class ConfigsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  operator: string;

  @Column({ nullable: true })
  service_id: string;

  @Column({ nullable: true })
  key: string;

  @Column({ nullable: true })
  value: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, default: null })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: string;
}
