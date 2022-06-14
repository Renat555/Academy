import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ElementOrFormNameComponent } from './element-or-form-name.component';

describe('ElementOrFormNameComponent', () => {
  let component: ElementOrFormNameComponent;
  let fixture: ComponentFixture<ElementOrFormNameComponent>;

  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElementOrFormNameComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementOrFormNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
