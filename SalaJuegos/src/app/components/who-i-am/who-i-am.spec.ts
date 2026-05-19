import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoIAm } from './who-i-am';

describe('WhoIAm', () => {
  let component: WhoIAm;
  let fixture: ComponentFixture<WhoIAm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhoIAm],
    }).compileComponents();

    fixture = TestBed.createComponent(WhoIAm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
