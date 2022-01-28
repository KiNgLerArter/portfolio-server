import { Roles } from '@common/decorators/roles.decorator';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { RolesList } from '@common/types/roles.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BanUserDto } from './dto/ban-user.dto';
import { userDto } from './dto/create-user.dto';
import { EditRolesDto } from './dto/edit-roles-dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() userDto: userDto.FE) {
    return this.userService.createUser(userDto);
  }

  @Roles(RolesList.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Roles(RolesList.MODER, RolesList.ADMIN)
  @UseGuards(RolesGuard)
  @Get('/:userId/get-roles')
  getRoles(@Param('userId') userId: number) {
    return this.userService.getRoles(userId);
  }

  @Roles(RolesList.MODER, RolesList.ADMIN)
  @UseGuards(RolesGuard)
  @Post('/add-roles')
  addRole(@Body() dto: EditRolesDto) {
    return this.userService.addRoles(dto);
  }

  @Roles(RolesList.MODER, RolesList.ADMIN)
  @UseGuards(RolesGuard)
  @Delete('/remove-roles')
  removeRole(@Body() dto: EditRolesDto) {
    return this.userService.removeRoles(dto);
  }

  @Roles(RolesList.ADMIN)
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.userService.banUser(dto);
  }
}
