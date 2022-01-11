import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UsersChats } from './combined/users-chats.model';
import { User } from './user.model';

interface ChatDialogCreationAttrs {
  name: string;
  userIds: number[];
}

@Table({ tableName: 'chat_dialogs' })
export class ChatDialog extends Model<ChatDialog, ChatDialogCreationAttrs> {
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
        chatType: 'dialog',
      },
    },
    foreignKey: 'chatId',
    constraints: false,
  })
  users: User[];
}
