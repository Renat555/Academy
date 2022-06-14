import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { UserDefinedRangeComponent } from './user-defined-range.component';

describe('UserDefinedRangeComponent', () => {
  let component: UserDefinedRangeComponent;
  let fixture: ComponentFixture<UserDefinedRangeComponent>;

  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDefinedRangeComponent],
      providers: [provideMockStore({ initialState })],
      imports: [RouterTestingModule],
    }).compileComponents();
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
