import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { BattlefieldMuveComponent } from './battlefield-muve.component';

describe('BattlefieldMuveComponent', () => {
  let component: BattlefieldMuveComponent;
  let fixture: ComponentFixture<BattlefieldMuveComponent>;

  const initialState = { enabled: true };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BattlefieldMuveComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
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
