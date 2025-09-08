import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioOverlay } from './portfolio-overlay';

describe('PortfolioOverlay', () => {
  let component: PortfolioOverlay;
  let fixture: ComponentFixture<PortfolioOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioOverlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
