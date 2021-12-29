import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlefieldEnemyComponent } from './battlefield-enemy.component';

describe('BattlefieldEnemyComponent', () => {
  let component: BattlefieldEnemyComponent;
  let fixture: ComponentFixture<BattlefieldEnemyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattlefieldEnemyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlefieldEnemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
