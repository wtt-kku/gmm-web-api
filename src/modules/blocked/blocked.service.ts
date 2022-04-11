import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SharedService } from 'src/shared/share/shared.service';
import { Repository } from 'typeorm';
import { BlockedEntity } from './entity.ts/blocked.entity';

@Injectable()
export class BlockedService {
  constructor(
    @InjectRepository(BlockedEntity)
    private blockedEntity: Repository<BlockedEntity>,
    private readonly sharedService: SharedService,
  ) {}

  async createBlockIP(ip: string, time: number = 180) {
    try {
      const checkBlocked = await this.blockedEntity
        .createQueryBuilder('blocked')
        .where('blocked.ip_address = :ip', {
          ip: ip,
        })
        .getOne();

      if (checkBlocked) {
        let blocked = new BlockedEntity();
        blocked.ip_address = ip;
        blocked.blocked_date = new Date().toISOString();
        blocked.unblocked_date = new Date(
          new Date().getTime() + time * 60000,
        ).toISOString();
        const fetch = async () => {
          await this.blockedEntity.update({ id: checkBlocked.id }, blocked);
        };
        fetch();
      } else {
        let blocked = new BlockedEntity();
        blocked.ip_address = ip;
        blocked.blocked_date = new Date().toISOString();
        blocked.unblocked_date = new Date(
          new Date().getTime() + time * 60000,
        ).toISOString();

        const fetch = async () => {
          await this.blockedEntity.save(blocked);
        };
        fetch();
      }

      return this.sharedService.returnResponse(200, checkBlocked);
    } catch (error) {
      console.log(error);
      return this.sharedService.returnResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  async checkIsBlocked(ip) {
    const blocked = await this.blockedEntity
      .createQueryBuilder('blocked')
      .where('blocked.ip_address = :ip', {
        ip: ip,
      })
      .getOne();

    if (blocked) {
      const current_date = new Date().toISOString();

      if (Date.parse(current_date) < Date.parse(blocked.unblocked_date)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
