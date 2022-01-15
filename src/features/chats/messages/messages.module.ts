import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { MessagesService } from './messages.service';

import { Message } from '@db-models/message.model';

@Module({
  providers: [MessagesService],
  imports: [SequelizeModule.forFeature([Message])],
  exports: [MessagesService],
})
export class MessagesModule {}
