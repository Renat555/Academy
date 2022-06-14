import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ScaleComponent } from './scale.component';

describe('ScaleComponent', () => {
  let component: ScaleComponent;
  let fixture: ComponentFixture<ScaleComponent>;

  const initialState = { enabled: true };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScaleComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
