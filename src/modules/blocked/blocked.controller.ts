import { Controller, Get, Query } from '@nestjs/common';
import { BlockedService } from './blocked.service';

@Controller('blocked')
export class BlockedController {
  constructor(private readonly blockedService: BlockedService) {}
}
