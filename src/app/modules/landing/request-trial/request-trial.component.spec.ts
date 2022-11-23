import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTrialComponent } from './request-trial.component';

describe('RequestTrialComponent', () => {
  let component: RequestTrialComponent;
  let fixture: ComponentFixture<RequestTrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestTrialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
