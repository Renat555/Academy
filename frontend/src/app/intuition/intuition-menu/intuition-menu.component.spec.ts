import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { IntuitionMenuComponent } from './intuition-menu.component';

describe('IntuitionMenuComponent', () => {
  let component: IntuitionMenuComponent;
  let fixture: ComponentFixture<IntuitionMenuComponent>;

  const initialState = { enabled: true };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntuitionMenuComponent],
      providers: [provideMockStore({ initialState })],
      imports: [RouterTestingModule],
    }).compileComponents();
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
