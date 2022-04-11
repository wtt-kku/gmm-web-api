import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/environments/configuration.service';
import { SharedService } from 'src/shared/share/shared.service';
import { LogEntity } from './entity/log.entity';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([LogEntity]),
  ],
  controllers: [LogController],
  providers: [LogService, SharedService],
})
export class LogModule {}
