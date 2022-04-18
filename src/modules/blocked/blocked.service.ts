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

  async createBlockIP(ip: string, time: number = 10800) {
    var unblocked_cal = new Date();
    unblocked_cal.setSeconds(unblocked_cal.getSeconds() + time);
    var unblocked_time = unblocked_cal.toISOString();

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
        blocked.unblocked_date = unblocked_time;
        const fetch = async () => {
          await this.blockedEntity.update({ id: checkBlocked.id }, blocked);
        };
        fetch();
      } else {
        let blocked = new BlockedEntity();
        blocked.ip_address = ip;
        blocked.blocked_date = new Date().toISOString();
        blocked.unblocked_date = unblocked_time;

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
