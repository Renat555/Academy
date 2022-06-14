import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { BattlefieldEnemyComponent } from './battlefield-enemy.component';

describe('BattlefieldEnemyComponent', () => {
  let component: BattlefieldEnemyComponent;
  let fixture: ComponentFixture<BattlefieldEnemyComponent>;

  const initialState = { enabled: true };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BattlefieldEnemyComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
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
