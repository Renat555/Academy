import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IntuitionComponent } from './intuition.component';

describe('IntuitionComponent', () => {
  let component: IntuitionComponent;
  let fixture: ComponentFixture<IntuitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntuitionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntuitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
