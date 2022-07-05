import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AccuseService } from './accuse.service';
import { Accuse } from './schema/accuse.schema';
import { STATUS_TYPE } from './schema/constants';

@Controller('accuse')
export class AccuseController {
  constructor(private readonly accuseService: AccuseService) {}

  @Post()
  async addAccuse(@Body() req): Promise<Accuse> {
    console.log('add accuse');
    const params = {
      ...req, // relativeId, userId, type(post, comment)
      status: STATUS_TYPE.READY,
      created: new Date().getTime(),
      updated: new Date().getTime(),
    };
    return await this.accuseService.addAccuse(params);
  }
}
