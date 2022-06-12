import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { UsersChats } from './combined/users-chats.model';
import { Message } from './message.model';
import { User } from './user.model';

interface ChatCreationAttrs {
  name: string;
}

@Table({ tableName: 'chats' })
export class Chat extends Model<Chat, ChatCreationAttrs> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @BelongsToMany(() => User, () => UsersChats)
  users: User[];

  @HasMany(() => Message, 'chatId')
  messages: Message[];
}
