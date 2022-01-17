import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMiniComponent } from './auth-mini.component';

describe('AuthMiniComponent', () => {
  let component: AuthMiniComponent;
  let fixture: ComponentFixture<AuthMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthMiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
