import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SharedService } from 'src/shared/share/shared.service';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { FindByIPDto } from './dto/find-by-ip.dto';

import { LogEntity } from './entity/log.entity';

interface ClientData {
  ip: string;
  device: string;
  browser: string;
}

interface ClientData {
  ip: string;
  device: string;
  browser: string;
}

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogEntity)
    private logRepository: Repository<LogEntity>,
    private readonly sharedService: SharedService,
  ) {}

  async getLog(findByIPDto: FindByIPDto, realIP) {
    try {
      const logs = await this.logRepository
        .createQueryBuilder('t')
        .where('t.ip = :ip', { ip: findByIPDto.ip || realIP })
        .getMany();
      if (logs.length === 0) {
        return this.sharedService.returnResponse(204);
      }
      return this.sharedService.returnResponse(200, logs);
    } catch (error) {
      return this.sharedService.returnResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  async crateCompleteLog(createLogDto: CreateLogDto, clientData: ClientData) {
    const crateComplaeteLog = await this.createLogNew(
      createLogDto,
      clientData,
      false,
      true,
    );

    if (crateComplaeteLog) {
      return this.sharedService.returnResponse(200);
    } else {
      return this.sharedService.returnResponse(404);
    }
  }

  async checkLimitByHistoryLog(
    ip: string,
    backward_time_sec: number,
    acceptable_times: number,
  ) {
    const currentTime = new Date();
    const backwardTime = new Date(
      new Date().getTime() - backward_time_sec * 1000,
    );

    const queryStart = `${backwardTime.getFullYear()}-${
      backwardTime.getMonth() + 1
    }-${backwardTime.getDate()} ${backwardTime.getHours()}:${backwardTime.getMinutes()}:${backwardTime.getSeconds()}`;

    const queryEnd = `${currentTime.getFullYear()}-${
      currentTime.getMonth() + 1
    }-${currentTime.getDate()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

    const logs = await this.logRepository
      .createQueryBuilder('t')
      .where(
        '( t.transaction_date between :queryStart and  :queryEnd ) and t.ip = :ip and t.is_complete = :isComplete ',
        {
          queryStart,
          queryEnd,
          ip: ip,
          isComplete: false,
        },
      )
      .getMany();

    if (logs.length >= acceptable_times) {
      return false;
    }

    return true;
  }

  async createLogNew(
    createLogDto: CreateLogDto,
    clientData: ClientData,
    isBlocked: boolean = false,
    isComplete: boolean = false,
  ) {
    try {
      let log = new LogEntity();
      log.msisdn = createLogDto.msisdn;
      log.ip = clientData.ip;
      log.device = clientData.device;
      log.browser = clientData.browser;
      log.service_name = createLogDto.service_id;
      log.cid = createLogDto.cid;
      log.media_code = createLogDto.media_code;
      log.short_code = createLogDto.short_code ? createLogDto.short_code : null;
      log.appear_time = createLogDto.appear_time
        ? createLogDto.appear_time
        : null;
      log.hit_time = createLogDto.hit_time ? createLogDto.hit_time : null;
      log.time_on_page = createLogDto.time_on_page
        ? createLogDto.time_on_page
        : null;
      log.is_bot = createLogDto.is_bot ? createLogDto.is_bot : false;
      log.is_complete = isComplete;
      log.blocked = isBlocked;
      log.transaction_date = new Date().toISOString();

      const fetch = async () => {
        await this.logRepository.save(log);
      };
      fetch();
      return true;
    } catch (error) {
      return false;
    }
  }
}
