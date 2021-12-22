import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDefinedRangeComponent } from './user-defined-range.component';

describe('UserDefinedRangeComponent', () => {
  let component: UserDefinedRangeComponent;
  let fixture: ComponentFixture<UserDefinedRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDefinedRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDefinedRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
