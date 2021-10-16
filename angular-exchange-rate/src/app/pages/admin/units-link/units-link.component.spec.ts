import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsLinkComponent } from './units-link.component';

describe('UnitsLinkComponent', () => {
  let component: UnitsLinkComponent;
  let fixture: ComponentFixture<UnitsLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
