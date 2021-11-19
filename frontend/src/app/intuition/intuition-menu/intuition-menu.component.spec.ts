import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntuitionMenuComponent } from './intuition-menu.component';

describe('IntuitionMenuComponent', () => {
  let component: IntuitionMenuComponent;
  let fixture: ComponentFixture<IntuitionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntuitionMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntuitionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
