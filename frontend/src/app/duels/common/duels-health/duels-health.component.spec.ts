import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelsHealthComponent } from './duels-health.component';

describe('DuelsHealthComponent', () => {
  let component: DuelsHealthComponent;
  let fixture: ComponentFixture<DuelsHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuelsHealthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuelsHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
