import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSuitsComponent } from './card-suits.component';

describe('CardSuitsComponent', () => {
  let component: CardSuitsComponent;
  let fixture: ComponentFixture<CardSuitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSuitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSuitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
