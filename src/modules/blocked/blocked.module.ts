import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/environments/configuration.service';
import { SharedService } from 'src/shared/share/shared.service';
import { BlockedController } from './blocked.controller';
import { BlockedService } from './blocked.service';
import { BlockedEntity } from './entity.ts/blocked.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([BlockedEntity]),
  ],
  controllers: [BlockedController],
  providers: [BlockedService, SharedService],
})
export class BlockedModule {}
