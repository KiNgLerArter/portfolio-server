import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from './role.model';
import { UsersRoles } from './combined/users-roles.model';
import { UsersChats } from './combined/users-chats.model';
import { Chat } from './chat.model';
import { Token } from './token.model';
import { Message } from './message.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  nickname: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
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

  @Column({
    type: DataType.STRING,
  })
  surname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nickname: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isActivated: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isBanned: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @BelongsToMany(() => Role, () => UsersRoles)
  roles: Role[];

  @BelongsToMany(() => Chat, () => UsersChats)
  chats: Chat[];

  @HasMany(() => Message, 'ownerId')
  messages: Message[];

  @HasOne(() => Token)
  token: Token;
}
