import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlefieldUserComponent } from './battlefield-user.component';

describe('BattlefieldUserComponent', () => {
  let component: BattlefieldUserComponent;
  let fixture: ComponentFixture<BattlefieldUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattlefieldUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlefieldUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
