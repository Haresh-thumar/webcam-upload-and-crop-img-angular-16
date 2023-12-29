import { Component } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-timer-count',
  templateUrl: './timer-count.component.html',
  styleUrls: ['./timer-count.component.scss']
})
export class TimerCountComponent {

  timerRunning = false;
  timerDisplay = '';

  startTimer(): void {
    this.timerRunning = true;
    const duration = 60; // 60 seconds
    let timeRemaining = duration;
    const timer$ = timer(0, 1000);
    const subscription = timer$.subscribe(() => {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      this.timerDisplay = `${minutes}:${this.formatTime(seconds)}`;
      if (timeRemaining <= 0) {
        this.timerRunning = false;
        this.timerDisplay = '';
        subscription.unsubscribe();
      } else {
        timeRemaining--;
      }
    });
  }

  formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

}
