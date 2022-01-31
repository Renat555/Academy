import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStatComponent } from './detail-stat.component';

describe('DetailStatComponent', () => {
  let component: DetailStatComponent;
  let fixture: ComponentFixture<DetailStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
