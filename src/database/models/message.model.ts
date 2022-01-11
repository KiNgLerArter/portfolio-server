import { RolesList } from '@common/types/roles.model';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ChatGroup } from './chat-group.model';
import { UsersRoles } from './combined/users-roles.model';
import { User } from './user.model';

interface MessageCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'messages' })
export class Message extends Model<Message, MessageCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  body: string;

  @Column({
    type: DataType.NUMBER,
  })
  repliedMessageId: number;

  @BelongsTo(() => ChatGroup)
  chatGroupId: ChatGroup;
}
