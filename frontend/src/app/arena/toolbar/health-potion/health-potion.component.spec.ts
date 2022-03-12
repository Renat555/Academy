import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPotionComponent } from './health-potion.component';

describe('HealthPotionComponent', () => {
  let component: HealthPotionComponent;
  let fixture: ComponentFixture<HealthPotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthPotionComponent ]
    })
    .compileComponents();
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
