import { TestBed } from '@angular/core/testing';

import { LoggedauthGuard } from './loggedauth.guard';

describe('LoggedauthGuard', () => {
  let guard: LoggedauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
