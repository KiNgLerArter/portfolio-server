import { RolesList } from '@common/types/roles.model';
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
  msgOwnerId: number;
  chatId: string;
  sentDate: string;
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

  @BelongsTo(() => User)
  owner: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  ownerId: number;

  @BelongsTo(() => Chat)
  chat: Chat;

  @ForeignKey(() => Chat)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  chatId: string;

  @BelongsTo(() => Message)
  repliedOnMessage: Message;

  @ForeignKey(() => Message)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    primaryKey: true,
  })
  repliedOnMessageId: number;

  @HasMany(() => Message)
  repliedMessages: Message[];
}
