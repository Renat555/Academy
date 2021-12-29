import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlefieldCentreComponent } from './battlefield-centre.component';

describe('BattlefieldCentreComponent', () => {
  let component: BattlefieldCentreComponent;
  let fixture: ComponentFixture<BattlefieldCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattlefieldCentreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlefieldCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
