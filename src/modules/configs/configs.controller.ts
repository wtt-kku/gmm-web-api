import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ConfigsService } from '../configs/configs.service';
import { GetConfigDto } from './dto/get-config.dto';
import { RealIP } from 'nestjs-real-ip';
import { FILTER_BODY } from 'src/schemas/log.schema';

@ApiTags('Configuration')
@Controller('configs')
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}

  @Post()
  @ApiBody(FILTER_BODY)
  async getConfig(
    @Body() getConfigDto: GetConfigDto,
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
    return this.configsService.filter(getConfigDto, clientData);
  }
}
