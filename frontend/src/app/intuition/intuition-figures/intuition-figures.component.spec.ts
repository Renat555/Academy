import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntuitionFiguresComponent } from './intuition-figures.component';

describe('IntuitionComponent', () => {
  let component: IntuitionFiguresComponent;
  let fixture: ComponentFixture<IntuitionFiguresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntuitionFiguresComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntuitionFiguresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
