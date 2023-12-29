import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerCountComponent } from './timer-count.component';

describe('TimerCountComponent', () => {
  let component: TimerCountComponent;
  let fixture: ComponentFixture<TimerCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimerCountComponent]
    });
    fixture = TestBed.createComponent(TimerCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
