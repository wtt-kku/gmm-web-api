import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SharedService } from 'src/shared/share/shared.service';
import { Repository } from 'typeorm';
import { BlockedService } from '../blocked/blocked.service';
import { LogEntity } from '../log/entity/log.entity';
import { LogService } from '../log/log.service';
import { GetConfigDto } from './dto/get-config.dto';
import { ConfigsEntity } from './entity/config-tb.entity';

interface Config {
  check_time_click?: boolean;
  time_click_min?: string;
  time_click_max?: string;
  limit_ip_count?: string;
  limit_ip_time?: string;
  check_limit_ip?: boolean;
  limit_ip_block_time?: string;
}

interface ClientData {
  ip: string;
  device: string;
  browser: string;
}

@Injectable()
export class ConfigsService {
  constructor(
    @InjectRepository(ConfigsEntity)
    private configsRepository: Repository<ConfigsEntity>,
    @InjectRepository(LogEntity)
    private logRepository: Repository<LogEntity>,
    private readonly sharedService: SharedService,
    private readonly logService: LogService,
    private readonly blockedService: BlockedService,
  ) {}

  async getConfigByServiceID(service_id: string, oper: string) {
    try {
      const configs = await this.configsRepository
        .createQueryBuilder('t')
        .where('t.service_id = :service_id and t.operator = :oper', {
          service_id,
          oper,
        })
        .getMany();

      if (configs.length === 0) {
        return [];
      }

      var each_data = {};
      configs.forEach((item) => {
        each_data[item.key] =
          item.value == 'true' || item.value == 'false'
            ? item.value === 'true'
            : item.value;
      });
      return each_data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async filter(getConfigDto: GetConfigDto, clientData: ClientData) {
    try {
      var config: Config = await this.getConfigByServiceID(
        getConfigDto.service_id,
        getConfigDto.operator,
      );

      // CHECK IS BLOCKED
      const checkIsBlocked = await this.blockedService.checkIsBlocked(
        clientData.ip,
      );

      if (checkIsBlocked) {
        return this.sharedService.returnResponse(404, '', 'IP BLOCKED');
      }

      //CHECK LIMIT IP
      if (
        'check_limit_ip' in config &&
        'limit_ip_count' in config &&
        'limit_ip_time' in config &&
        'limit_ip_block_time' in config
      ) {
        if (config.check_limit_ip) {
          //IF CHECK LIMIT ENABLE
          const checkLimitIsOK = await this.logService.checkLimitByHistoryLog(
            clientData.ip,
            parseInt(config.limit_ip_time),
            parseInt(config.limit_ip_count),
          );

          if (!checkLimitIsOK) {
            //IF NOT PASS

            //INSERT LOG BLOCK
            await this.logService.createLogNew(getConfigDto, clientData, true);

            //INSERT IP ADDRESS BLOCK
            await this.blockedService.createBlockIP(clientData.ip);
            //RETURN RES LIMIT TRANSACTION
            return this.sharedService.returnResponse(
              404,
              '',
              'LIMIT TRANSACTION , BLOCKED IP',
            );
          }

          //INSERT LOG (HAPPY)
          const createLog = await this.logService.createLogNew(
            getConfigDto,
            clientData,
          );

          if (createLog) {
            return this.sharedService.returnResponse(200, config);
          }
        } else {
          //IF CHECK LIMIT DISABLE
          //INSERT LOG (HAPPY)
          const createLog = await this.logService.createLogNew(
            getConfigDto,
            clientData,
          );

          if (createLog) {
            return this.sharedService.returnResponse(200, config);
          }
        }
      } else {
        return this.sharedService.returnResponse(
          404,
          '',
          'Not found check_limit_ip',
        );
      }
    } catch (error) {
      return this.sharedService.returnResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }
}
