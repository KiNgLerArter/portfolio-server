import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '@db-models/user.model';
import { Chat } from '@db-models/chat.model';

@Table({ tableName: 'users_chats', createdAt: false, updatedAt: false })
export class UsersChats extends Model<UsersChats> {
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

  @ForeignKey(() => Chat)
  @Column({
    type: DataType.INTEGER,
  })
  chatId: number;
}
