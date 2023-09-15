import { TestBed } from '@angular/core/testing';

import { AddCoursService } from './add-cours.service';

describe('AddCoursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddCoursService = TestBed.get(AddCoursService);
    expect(service).toBeTruthy();
  });
});
