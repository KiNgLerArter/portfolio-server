import { RolesList } from '@common/types/roles.types';
import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Chat } from './chat.model';
import { UsersRoles } from './combined/users-roles.model';
import { User } from './user.model';

interface MessageCreationAttrs {
  body: string;
  sentDate: string;
  ownerId: number;
  chatId: string;
  repliedOnMessageId?: number;
}

@Table({ tableName: 'messages' })
export class Message extends Model<Message, MessageCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  body: string;

  @Column({
    type: DataType.DATE,
  })
  sentDate: string;

  @BelongsTo(() => User, 'ownerId')
  owner: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId: number;

  @BelongsTo(() => Chat, 'chatId')
  chat: Chat;

  @ForeignKey(() => Chat)
  @Column({ type: DataType.UUID })
  chatId: string;

  @BelongsTo(() => Message, 'repliedOnMessageId')
  repliedOnMessage: Message;

  @ForeignKey(() => Message)
  @Column({
    type: DataType.INTEGER,
  })
  repliedOnMessageId: number;

  @HasMany(() => Message)
  repliedMessages: Message[];
}
