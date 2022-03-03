import { RolesService } from '@features/roles/roles.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@db-models/user.model';
import { BanUserDto } from './dtos/ban-user.dto';
import { EditRolesDto } from './dtos/edit-roles-dto';
import { RolesList } from '@common/types/roles.model';
import { userDto } from './dtos/create-user.dto';
import { Role } from '@db-models/role.model';
import { Chat } from '@db-models/chat.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({
      include: [
        { model: Role, through: { attributes: [] } },
        { model: Chat, attributes: { include: ['id'] } },
      ],
      attributes: { exclude: ['token'] },
    });
    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id);
    return user;
  }

  async getUsersByIds(ids: number[]): Promise<User[]> {
    const users = await this.userRepository.findAll({ where: { id: ids } });
    return users;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async createUser(dto: userDto.FE): Promise<User> {
    const user = await this.userRepository.create(dto);
    await this.addRoles({ userId: user.id, roles: [RolesList.USER] });
    return user;
  }

  async banUser(dto: BanUserDto): Promise<User> {
    const user = await this.userRepository.findByPk(dto.userId);
    user.update({ banReason: dto.banReason, isBanned: true });
    return user;
  }

  async unbanUser(dto: BanUserDto): Promise<User> {
    const user = await this.userRepository.findByPk(dto.userId);
    user.update({ banReason: null, isBanned: false });
    return user;
  }

  //** User roles */
  async getRoles(userId: number): Promise<User['roles']> {
    const userRoles = (await this.userRepository.findByPk(userId)).roles;
    return userRoles;
  }

  async addRoles(dto: EditRolesDto): Promise<User> {
    const user = await this.userRepository.findByPk(dto.userId);
    const roles = await this.rolesService.getRolesByValues(dto.roles);
    if (roles && user) {
      await user.$add(
        'roles',
        roles.map((role) => role.id),
      );
    }
    return user;
  }

  async removeRoles(dto: EditRolesDto): Promise<User> {
    const user = await this.userRepository.findByPk(dto.userId);
    const roles = await this.rolesService.getRolesByValues(dto.roles);
    if (roles && user) {
      user.$remove(
        'roles',
        roles.map((role) => role.id),
      );
    }
    return user;
  }
}
