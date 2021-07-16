import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectorLogsComponent } from './detector-logs.component';

describe('DetectorLogsComponent', () => {
  let component: DetectorLogsComponent;
  let fixture: ComponentFixture<DetectorLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetectorLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectorLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
