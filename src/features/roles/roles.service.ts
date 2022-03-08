import { Role } from '@db-models/role.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto): Promise<Role> {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoleByValue(value: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }

  async getRolesByValues(values: string[]): Promise<Role[]> {
    const roles = await this.roleRepository.findAll({
      where: { value: values },
    });
    return roles;
  }

  async createMockRoles(): Promise<void> {
    const mockRoles: CreateRoleDto[] = [
      { value: 'user', description: 'standard user' },
      { value: 'moder', description: 'moderator' },
      { value: 'admin', description: 'administrator' },
    ];

    await this.roleRepository.drop();
    for (let i = 0; i < mockRoles.length; i++) {
      await this.createRole(mockRoles[i]);
    }
  }
}
