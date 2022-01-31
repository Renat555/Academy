import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraStatComponent } from './general-stat.component';

describe('GeneraStatComponent', () => {
  let component: GeneraStatComponent;
  let fixture: ComponentFixture<GeneraStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneraStatComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneraStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
