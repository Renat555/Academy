import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntuitionBottomComponent } from './intuition-bottom.component';

describe('IntuitionBottomComponent', () => {
  let component: IntuitionBottomComponent;
  let fixture: ComponentFixture<IntuitionBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntuitionBottomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntuitionBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
