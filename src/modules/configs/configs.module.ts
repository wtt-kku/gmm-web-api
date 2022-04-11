import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/environments/configuration.service';
import { SharedService } from 'src/shared/share/shared.service';
import { BlockedService } from '../blocked/blocked.service';
import { BlockedEntity } from '../blocked/entity.ts/blocked.entity';
import { LogEntity } from '../log/entity/log.entity';
import { LogService } from '../log/log.service';
import { ConfigsController } from './configs.controller';
import { ConfigsService } from './configs.service';
import { ConfigsEntity } from './entity/config-tb.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([ConfigsEntity, LogEntity, BlockedEntity]),
  ],
  controllers: [ConfigsController],
  providers: [ConfigsService, SharedService, BlockedService, LogService],
})
export class ConfigsModule {}
