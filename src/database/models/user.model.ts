import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from './role.model';
import { UserRoles } from './combined/user-roles.model';
import { ChatGroup } from './chat-group.model';
import { UserChatGroups } from './combined/user-chat-groups.model';

interface UserCreationAttrs {
  email: string;
  password: string;
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
    defaultValue: false,
  })
  banned: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @BelongsToMany(() => ChatGroup, () => UserChatGroups)
  chatGroups: ChatGroup[];
}
