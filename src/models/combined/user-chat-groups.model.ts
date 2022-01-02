import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ChatGroup } from '@models/chat-group.model';
import { User } from '@models/user.model';

@Table({ tableName: 'user_chat_groups', createdAt: false, updatedAt: false })
export class UserChatGroups extends Model<UserChatGroups> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => ChatGroup)
  @Column({
    type: DataType.INTEGER,
  })
  chatGroupId: number;
}
