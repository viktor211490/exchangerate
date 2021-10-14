import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeCardComponent } from './exchange-card.component';

describe('ExchangeCardComponent', () => {
  let component: ExchangeCardComponent;
  let fixture: ComponentFixture<ExchangeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
