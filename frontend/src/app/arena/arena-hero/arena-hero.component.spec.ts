import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaHeroComponent } from './arena-hero.component';

describe('ArenaHeroComponent', () => {
  let component: ArenaHeroComponent;
  let fixture: ComponentFixture<ArenaHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArenaHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
