import { Controller, Delete, Patch, Post } from '@nestjs/common';

@Controller()
export class ChatGroupController {
  @Post()
  createGroup() {}

  @Patch()
  updateGroup() {}

  @Delete()
  deleteGroup() {}
}
