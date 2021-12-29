import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlefieldMuveComponent } from './battlefield-muve.component';

describe('BattlefieldMuveComponent', () => {
  let component: BattlefieldMuveComponent;
  let fixture: ComponentFixture<BattlefieldMuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattlefieldMuveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlefieldMuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
