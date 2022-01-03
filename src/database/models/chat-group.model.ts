import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserChatGroups } from './combined/user-chat-groups.model';
import { User } from './user.model';

interface ChatGroupCreationAttrs {
  name: string;
  icon: string;
  memberIds: number[];
}

@Table({ tableName: 'chat_groups' })
export class ChatGroup extends Model<ChatGroup, ChatGroupCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @BelongsToMany(() => User, () => UserChatGroups)
  users: string[];
}
