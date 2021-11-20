import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntuitionBlackWhiteComponent } from './intuition-black-white.component';

describe('IntuitionBlackWhiteComponent', () => {
  let component: IntuitionBlackWhiteComponent;
  let fixture: ComponentFixture<IntuitionBlackWhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntuitionBlackWhiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntuitionBlackWhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
