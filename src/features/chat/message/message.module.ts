import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { MessageService } from './message.service';

import { Message } from '@db-models/message.model';

@Module({
  providers: [MessageService],
  imports: [SequelizeModule.forFeature([Message])],
  exports: [MessageService],
})
export class MessageModule {}
