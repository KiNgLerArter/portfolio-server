import { Controller, Get } from '@nestjs/common';
import { MockService } from './mock.service';

@Controller()
export class MockController {
  constructor(private mockService: MockService) {}

  @Get('fill-db')
  fillDB(): Promise<void> {
    console.log('[😈😈fill-db called😈😈]');
    return this.mockService.fillDB();
  }
}
