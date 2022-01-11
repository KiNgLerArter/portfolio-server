import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '@db-models/user.model';

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

  @ForeignKey(null)
  @Column({
    type: DataType.INTEGER,
    unique: 'id_type',
    references: null,
  })
  chatId: number;

  @Column({
    type: DataType.STRING,
    unique: 'id_type',
  })
  chatType: string;
}
