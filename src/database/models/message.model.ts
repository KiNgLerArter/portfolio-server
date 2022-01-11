import { RolesList } from '@common/types/roles.model';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Chat } from './chat.model';
import { UsersRoles } from './combined/users-roles.model';
import { User } from './user.model';

interface MessageCreationAttrs {
  value: string;
  description: string;
  chatId: number;
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  msgOwnerId: number;

  @Column({
    type: DataType.INTEGER,
  })
  repliedMessageId: number;

  @ForeignKey(() => Chat)
  chatId: string;
}
