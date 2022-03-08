import { Controller, Get } from '@nestjs/common';
import { MockService } from './mock.service';

@Controller('mock')
export class MockController {
  constructor(private mockService: MockService) {}

  @Get('fill-db')
  fillDB(): Promise<void> {
    return this.mockService.fillDB();
  }
}
