import { Body, Controller, Get, Post, Query, Headers } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateLogDto } from './dto/create-log.dto';
import { LogService } from './log.service';

import { FindByIPDto } from './dto/find-by-ip.dto';
import { RealIP } from 'nestjs-real-ip';
import { LOGSUCCESS_BODY } from 'src/schemas/log.schema';

@ApiTags('Transaction Log')
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}
  @Get()
  async getLogs(@Query() findByIPDto: FindByIPDto, @RealIP() ip: string) {
    const realIP = ip
      .replace('::', '')
      .replace('ffff:', '')
      .replace('::ffff:', '');

    return this.logService.getLog(findByIPDto, realIP);
  }

  @Post('/complete')
  @ApiBody(LOGSUCCESS_BODY)
  async createSuccesLog(
    @Body() CreateLogDto: CreateLogDto,
    @Headers() header,
    @RealIP() ip: string,
  ) {
    const UserAgent = header['user-agent'];

    const getDeviceType = () => {
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(UserAgent)) {
        return 'tablet';
      }
      if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          UserAgent,
        )
      ) {
        return 'mobile';
      }
      return 'desktop';
    };
    const realIP = ip
      .replace('::', '')
      .replace('ffff:', '')
      .replace('::ffff:', '');

    const clientData = {
      ip: realIP,
      device: getDeviceType(),
      browser: '-',
    };
    console.log(clientData);
    return this.logService.crateCompleteLog(CreateLogDto, clientData);
  }
}
