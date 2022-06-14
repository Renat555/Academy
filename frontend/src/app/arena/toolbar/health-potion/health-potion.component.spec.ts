import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { HealthPotionComponent } from './health-potion.component';

describe('HealthPotionComponent', () => {
  let component: HealthPotionComponent;
  let fixture: ComponentFixture<HealthPotionComponent>;

  const initialState = { firstHealthPotion: true };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthPotionComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthPotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
