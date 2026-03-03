import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Spoc } from './spoc';

describe('Spoc', () => {
  let component: Spoc;
  let fixture: ComponentFixture<Spoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Spoc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
