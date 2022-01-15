import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Roles } from '@common/decorators/roles.decorator';
import { RolesGuard } from '@common/guards/roles.guard';
import { RolesList } from '@common/types/roles.model';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { EditChatDto } from './dto/edit-chat.dto';
import { GetFilteredChatsDto } from './dto/get-chats.dto';
import { Chat } from '@db-models/chat.model';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Get()
  async getChats(@Body() dto: GetFilteredChatsDto = null): Promise<Chat[]> {
    return this.chatsService.getChats(dto);
  }

  @Get(':userId')
  async getUserChats(@Param('userId') userId: number): Promise<Chat[]> {
    return this.chatsService.getUserChats(userId);
  }

  @Post('create')
  async createChat(@Body() dto: CreateChatDto): Promise<Chat> {
    return this.chatsService.createChat(dto);
  }

  @Delete(':chatId')
  async deleteChat(@Param('chatId') chatId: string) {
    return this.chatsService.deleteChat(chatId);
  }

  @Patch('')
  async editChat(@Body() dto: EditChatDto) {
    return this.chatsService.editChat(dto);
  }
}
