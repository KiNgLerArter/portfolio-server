import {
  BelongsToMany,
  Column,
  DataType,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { UsersChats } from './combined/users-chats.model';
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

  @BelongsToMany(() => User, {
    through: {
      model: () => UsersChats,
      unique: false,
      scope: {
        chatType: 'group',
      },
    },
    foreignKey: 'chatId',
    constraints: false,
  })
  users: User[];
}
