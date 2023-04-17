import { Injectable } from '@nestjs/common';
import { mockDeep } from 'jest-mock-extended';

import { FlagsService } from '@thirtymadison/nestjs-flags';

class FlagsMock {
  constructor() {
    return mockDeep<FlagsService>();
  }
}

@Injectable()
export class MockFlagsService extends FlagsMock {}
