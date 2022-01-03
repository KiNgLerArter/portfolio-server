import { Controller, Delete, Patch, Post } from '@nestjs/common';

@Controller()
export class ChatDialogController {
  @Post()
  createDialog() {}

  @Patch()
  updateDialog() {}

  @Delete()
  deleteDialog() {}
}
